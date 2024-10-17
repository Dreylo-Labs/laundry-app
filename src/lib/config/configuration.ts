import { IConfig } from "../../interfaces/config.interface";
import { config } from 'dotenv';

config();

export const APP_CONFIGURATION: IConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URI: process.env.DATABASE_URI
};