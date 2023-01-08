export interface IPasswordEncryptionService {
  hash(password: string): Promise<string> | string;
  verify(password: string, hash: string): Promise<boolean> | boolean;
}

export const PASSWORD_ENCRYPTION_SERVICE_TOKEN = 'IPasswordEncryptionService';
