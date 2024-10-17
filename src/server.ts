import {INestApplication, ValidationPipe, VersioningType,} from '@nestjs/common'
import { ConfigService } from './lib/config/config.service'

export class Server {
  constructor(
    private readonly app: INestApplication,
    private readonly configService: ConfigService,
  ){}

  static init(app: INestApplication, config: ConfigService) {
    return new Server(app, config);
  }

  configure(){
    this.app.enableCors({
      allowedHeaders: [
        'Content_Type',
        'content-type',
        'Authorization',
        'authorization'
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      origin: ['http://localhost'],
      credentials: true,
      optionsSuccessStatus: 200,
    });

    this.app.setGlobalPrefix('api');

    this.app.enableVersioning({
      type: VersioningType.URI,
      prefix: 'v',
    });

    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
      }),
    );
    
    return this;
  }

  async boot() {
    await this.app.listen(this.configService.get('PORT'))
  }
}