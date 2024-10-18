import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponse } from '../dto/response.dto';

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<SuccessResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return new SuccessResponse(data);
      }),
    );
  }
}
