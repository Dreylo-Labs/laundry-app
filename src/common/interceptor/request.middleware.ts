import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "../../lib/config/config.service";
import { LoggerService } from "../../lib/logger/logger.service";
import { Request, Response } from "express";
import { Observable, tap } from "rxjs";


@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService
  ) {}
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    if (this.config.get('NODE_ENV') === 'production') {
      return next.handle();
    }
    const http = ctx.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const method = request.method;
    const url = request.url;
    const code = response.statusCode;
    const imncomingTime = request['startTime'];

    return next.handle().pipe(
      tap(() => {
        this.logger.logRequest(`${method} ${code} ${Date.now() - imncomingTime}ms`, ctx.getClass().name,);
      }),
    );
  }
}