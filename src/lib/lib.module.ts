import { Module } from '@nestjs/common';
import { PASSWOORD_ENCRYPTION_SERVICE_TOKEN } from './interfaces/password-encryption-service.interface';
import { PasswordEncryptionService } from './password-encryption.service';

@Module({
  providers: [
    {
      provide: PASSWOORD_ENCRYPTION_SERVICE_TOKEN,
      useClass: PasswordEncryptionService,
    },
  ],
  exports: [PASSWOORD_ENCRYPTION_SERVICE_TOKEN],
})
export class LibModule {}
