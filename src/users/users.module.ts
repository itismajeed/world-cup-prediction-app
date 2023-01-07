import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { USERS_SERVICE_TOKEN } from './interfaces/users-service.interface';
import { LibModule } from 'src/lib/lib.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LibModule],
  providers: [
    {
      provide: USERS_SERVICE_TOKEN,
      useClass: UsersService,
    },
  ],
  exports: [USERS_SERVICE_TOKEN],
})
export class UsersModule {}
