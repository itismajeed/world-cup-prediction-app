import { PasswordEncryptionService } from 'src/lib/password-encryption.service';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { config } from 'dotenv';
import { randomUUID } from 'crypto';

config();

export class SeedSuperAdminData1672949083814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordEncryptionService = new PasswordEncryptionService();
    console.log({ password: process.env.ADMIN_PASSWORD });
    if (!process.env.ADMIN_PASSWORD) {
      throw new Error('ADMIN_PASSWORD env is required to run migrations.');
    }
    const adminPasswordHash = await passwordEncryptionService.hash(
      process.env.ADMIN_PASSWORD,
    );
    await queryRunner.query(
      'INSERT INTO users (id,password,email,fullName,isActive) VALUES (?,?,?,"Administrator",1);',
      [randomUUID(), adminPasswordHash, process.env.ADMIN_EMAIL],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM users WHERE email=?;', [
      process.env.ADMIN_EMAIL,
    ]);
  }
}
