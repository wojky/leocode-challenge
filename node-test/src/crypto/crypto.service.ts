import { Injectable } from '@nestjs/common';
import { DiffieHellman, createDiffieHellman, HexBase64Latin1Encoding } from 'crypto';
import { storage } from 'src/storage/storage-mock';

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
  public async handleGenerateKeysRequest(userId: string): Promise<Keys> {
    const keys = this.generateKeys();

    await storage.update(userId, {pubKey: keys.pubKey});

    return keys;
  }

  public async handleEncryptRequest(userId: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pubKey = (await storage.query({id: userId})).pubKey;
    const pdfBase64String = await storage.getPdfBase64String();

    // TODO: encrypt pdf with public_key

    return pdfBase64String;
  }

  private generateKeys(options: GenerateKeysOptions = {encoding: 'base64', primeNumberLength: 30}): Keys  {
    const diff: DiffieHellman = createDiffieHellman(options.primeNumberLength);
    diff.generateKeys(options.encoding);

    const keys = {
      pubKey: diff.getPublicKey(options.encoding),
      privKey: diff.getPrivateKey(options.encoding)
    }

    return keys;
  }
}
