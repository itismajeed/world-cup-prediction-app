import { Module } from '@nestjs/common';
import { PasswordEncryptionService } from './password-encryption.service';

@Module({
  providers: [
    {
      provide: 'IPasswordEncryptionService',
      useClass: PasswordEncryptionService,
    },
  ],
})
export class LibModule {}
