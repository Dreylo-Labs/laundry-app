export interface IConfig {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URI: string;
  JWT_SECRET_KEY: string;
  JWT_AUDIENCE: string;
  JWT_EXPIRES_AT: string;
  JWT_ISSUER: string;
}
