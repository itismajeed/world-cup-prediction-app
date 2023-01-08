import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LibModule } from 'src/lib/lib.module';
import { UsersModule } from 'src/users/users.module';
import { IAuthServiceToken } from './auth-service.interface';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, LibModule, PassportModule, JwtModule],
  providers: [
    {
      provide: IAuthServiceToken,
      useClass: AuthService,
    },
    LocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
