import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LibModule } from './lib/lib.modules';
import { GlobalExceptionFilter } from './common/filters/global.filters';
import { RequestMiddleware } from './common/middleware/request.middleware';
import { GlobalResponseInterceptor } from './common/interceptor/response.interceptor';
import { HttpLoggingInterceptor } from './common/interceptor/http-logger.interceptor';
import { UtilsModule } from './utils/utils.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    UtilsModule,
    LibModule,
    FeaturesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
