import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { UsersHttpController } from './users-http.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [UsersHttpController],
})
export class UsersHttpModule {}
