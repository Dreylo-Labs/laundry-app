import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [ConfigModule.register(), DatabaseModule.register(), LoggerModule],
})
export class LibModule {}
