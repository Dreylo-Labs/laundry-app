import { IConfig } from '../../interfaces/config.interface';
import { config } from 'dotenv';

config();

export const APP_CONFIGURATION: IConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URI: process.env.DATABASE_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE,
  JWT_EXPIRES_AT: process.env.JWT_EXPIRES_AT,
  JWT_ISSUER: process.env.JWT_ISSUER,
};
