import { Injectable } from '@nestjs/common';
import { storage, User, UserUpdate } from './storage-mock';

@Injectable()
export class StorageService {
    public async query(queryObject: Partial<User>): Promise<User | null> {
        return await storage.query(queryObject);
    }

    public async update(id: string, obj: UserUpdate): Promise<User | null> {
        return await storage.update(id, obj);
    }

    public async getPdfBase64String(): Promise<string> {
        return await storage.getPdfBase64String();
    }
}
