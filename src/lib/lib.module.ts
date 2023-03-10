import { Module } from '@nestjs/common';
import { PASSWORD_ENCRYPTION_SERVICE_TOKEN } from './interfaces/password-encryption-service.interface';
import { PasswordEncryptionService } from './password-encryption.service';

@Module({
  providers: [
    {
      provide: PASSWORD_ENCRYPTION_SERVICE_TOKEN,
      useClass: PasswordEncryptionService,
    },
  ],
  exports: [PASSWORD_ENCRYPTION_SERVICE_TOKEN],
})
export class LibModule {}
