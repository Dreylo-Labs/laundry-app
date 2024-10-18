import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { INVALID_AUTH_TOKEN } from 'src/constants/error.constants';
import { UserService } from 'src/features/user/user.service';
import { AppJwtService } from 'src/lib/jwt/jwt.service';

export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: AppJwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    let token = request.headers['authorization'];

    if (!token || !token.startsWith('Bearer'))
      throw new HttpException(INVALID_AUTH_TOKEN, HttpStatus.UNAUTHORIZED);

    token = token.split(' ')[1];

    const payload = await this.jwtService.validateToken(token);
    const user = await this.userService.getUserByEmail(payload.email);

    if (!user)
      throw new HttpException(INVALID_AUTH_TOKEN, HttpStatus.UNAUTHORIZED);

    const leanUser = user.toJSON();
    request['user'] = leanUser;
    request['jwtPayload'] = payload;
    return true;
  }
}
