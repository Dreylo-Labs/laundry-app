import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtSubEnum } from 'src/constants/jwt.constants';
import { IJwtDecodedData } from 'src/interfaces/jwt.interface';
import { INVALID_AUTH_TOKEN } from 'src/constants/error.constants';

@Injectable()
export class JwtSubGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const subject = this.reflector.get<JwtSubEnum>(
      'jwtSubject',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const payload = request['jwtPayload'] as IJwtDecodedData;

    if (subject === payload.sub) return true;
    else throw new HttpException(INVALID_AUTH_TOKEN, HttpStatus.UNAUTHORIZED);
  }
}
