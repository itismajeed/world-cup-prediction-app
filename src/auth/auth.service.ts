import { Inject, Injectable } from '@nestjs/common';
import {
  IPasswordEncryptionService,
  PASSWORD_ENCRYPTION_SERVICE_TOKEN,
} from 'src/lib/interfaces/password-encryption-service.interface';
import {
  IUsersService,
  USERS_SERVICE_TOKEN,
} from 'src/users/interfaces/users-service.interface';
import { IAuthService } from './auth-service.interface';
import { IAuthenticationResult } from './authentication-result.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USERS_SERVICE_TOKEN)
    private readonly usersService: IUsersService,
    @Inject(PASSWORD_ENCRYPTION_SERVICE_TOKEN)
    private readonly passwordEncryptionService: IPasswordEncryptionService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async generateTokens(user: any): Promise<IAuthenticationResult> {
    const tokenPayload = { email: user.email, sub: user.id };
    const accessToken = await this.jwtService.signAsync(tokenPayload, {
      algorithm: 'HS256',
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
    const refreshToken = await this.jwtService.signAsync(tokenPayload, {
      algorithm: 'HS256',
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    });

    return { accessToken, refreshToken };
  }
  async validateUserEmailAndPassword(email: string, password: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      const isPasswordCorrect = await this.passwordEncryptionService.verify(
        password,
        user.password,
      );
      if (!isPasswordCorrect) return null;
      return user;
    } catch (error) {
      return null;
    }
  }
}
