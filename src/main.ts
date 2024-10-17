import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "./lib/config/config.service";
import { Server } from "./server";
import { useContainer } from 'class-validator'

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(AppModule, {
    logger: config.get('NODE_ENV') === 'production' ? false : ['log', 'error', 'warn', 'debug', 'verbose'], rawBody: true,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true});

  Server.init(app, config).configure().boot();
}

bootstrap()