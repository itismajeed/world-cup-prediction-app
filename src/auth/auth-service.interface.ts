import { User } from 'src/users/entities/user.entity';
import { IAuthenticationResult } from './authentication-result.interface';

export interface IAuthService {
  validateUserEmailAndPassword(
    emai: string,
    password: string,
  ): Promise<User | null>;
  generateTokens(user: any): Promise<IAuthenticationResult>;
}

export const IAuthServiceToken = 'IAuthService';
