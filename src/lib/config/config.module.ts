import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { LoggerModule } from "../logger/logger.module";

@Global()
@Module({})
export class ConfigModule {
  static register(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [LoggerModule],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}