import * as path from 'path';
import { Logger } from '@nestjs/common';
import * as winston from 'winston';

export class LoggerService extends Logger {
  private logger: winston.Logger;
  constructor() {
    super();
    this.initializeLogger();
  }

  initializeLogger() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.printf((info) => {
          return `[${info.level}]: - ${info.message}`;
        }),
      ),
      transports: [
        new winston.transports.File({
          dirname: path.join(process.cwd(), '/log/'),
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: path.join(process.cwd(), '/log/'),
          filename: 'info.log',
        }),
      ],
    });
  }

  log(message: any) {
    const formattedMessage = JSON.stringify(message);
    super.log(formattedMessage);
    this.logger.log('info', formattedMessage);
  }

  logRequest(requestMeta: string, context?: string) {
    super.log(requestMeta, context);
    this.logger.log('info', requestMeta);
  }

  error(message: any) {
    super.error(message);
    this.logger.error(message);
  }

  errorRequest(requestMeta: any) {
    super.error(requestMeta);
    this.logger.error(requestMeta);
  }
}
