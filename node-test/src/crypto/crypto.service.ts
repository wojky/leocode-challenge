import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DiffieHellman, createDiffieHellman, HexBase64Latin1Encoding } from 'crypto';
import { storage } from 'src/storage/storage-mock';
import * as crypto from 'crypto';

export interface Keys {
  privKey: string;
  pubKey: string;
}

interface GenerateKeysOptions {
  primeNumberLength?: number;
  encoding?: HexBase64Latin1Encoding;
}

@Injectable()
export class CryptoService {
  private IV_LENGTH = 16;
  private ENCODING: BufferEncoding = 'base64';
  private CIPHER_ALGORITHM = 'aes-256-cbc';

  public async handleGenerateKeysRequest(userId: string): Promise<Keys> {
    const keys = this.generateKeys();

    await storage.update(userId, {pubKey: keys.pubKey});

    return keys;
  }

  public async handleEncryptRequest(userId: string): Promise<string> {
    const pubKey = (await storage.query({id: userId})).pubKey;

    if (!pubKey) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Cannot find user public key. Generate new one',
      }, HttpStatus.FORBIDDEN);
    }

    const pdfBase64String = await storage.getPdfBase64String();

    return this.encrypt(pdfBase64String, pubKey);
  }

  private generateKeys(options: GenerateKeysOptions = {encoding: 'base64', primeNumberLength: 180}): Keys  {
    const diff: DiffieHellman = createDiffieHellman(options.primeNumberLength);

    diff.generateKeys(options.encoding);

    const keys: Keys = {
      pubKey: diff.getPublicKey(options.encoding),
      privKey: diff.getPrivateKey(options.encoding)
    }

    return keys;
  }

  private encrypt(stringToEncode: string, encryptionKey: string) {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(this.CIPHER_ALGORITHM, Buffer.from(encryptionKey), iv);
  
    const encrypted = Buffer.concat([cipher.update(stringToEncode), cipher.final()]);
   
    return iv.toString(this.ENCODING) + ':' + encrypted.toString(this.ENCODING);
   }


   private decrypt(stringToDecode: string, encryptionKey: string) {
    const textParts = stringToDecode.split(':');
    const iv = Buffer.from(textParts.shift(), this.ENCODING);
    const encryptedText = Buffer.from(textParts.join(':'), this.ENCODING);
    const decipher = crypto.createDecipheriv(this.CIPHER_ALGORITHM, Buffer.from(encryptionKey), iv);
   
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
   
    return decrypted.toString();
   }
}
