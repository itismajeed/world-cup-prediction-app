import { Injectable } from '@nestjs/common';
import { IPasswordEncryptionService } from './interfaces/password-encryption-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordEncryptionService implements IPasswordEncryptionService {
  verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
