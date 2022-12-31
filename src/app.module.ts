import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('MYSQL_DATABASE_HOST'),
          port: configService.get<number>('MYSQL_DATABASE_PORT'),
          username: configService.get<string>('MYSQL_DATABASE_USER'),
          password: configService.get<string>('MYSQL_DATABASE_PASSWORD'),
          database: configService.get<string>('MYSQL_DATABASE_NAME'),
          synchronize: configService.get<string>('NODE_ENV') === 'development',
          entities: [],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
