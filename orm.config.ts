import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { config as dotenvConfig } from 'dotenv';
import { DataSource } from 'typeorm';
dotenvConfig();
export const typeOrmConfig: MysqlConnectionOptions = {
  type: 'mysql',
  database: process.env.MYSQL_DATABASE_NAME,
  host: process.env.MYSQL_DATABASE_HOST,
  port: Number(process.env.MYSQL_DATABASE_PORT),
  username: process.env.MYSQL_DATABASE_USER,
  password: process.env.MYSQL_DATABASE_PASSWORD,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  // synchronize: process.env.NODE_ENV !== 'production',
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
};

export const dataSource = new DataSource(typeOrmConfig);
