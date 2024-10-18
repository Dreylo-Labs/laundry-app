import {
  HttpException,
  Injectable,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpLoggingInterceptor } from 'src/common/interceptor/http-logger.interceptor';
import { ConfigService } from '../config/config.service';
import jwksClient from 'jwks-rsa';
import { JwtSubEnum } from 'src/constants/jwt.constants';
import { InjectModel } from '@nestjs/mongoose';
import {
  IJwtDecodedData,
  IJwtOptions,
  IJwtPayload,
} from 'src/interfaces/jwt.interface';

@Injectable()
@UseInterceptors(HttpLoggingInterceptor)
export class AppJwtService {
  private jwtSecretKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.jwtSecretKey = this.configService
      .get('JWT_SECRET_KEY')
      .replace(/\\n/gm, '\n');
  }

  getToken = async (payload: IJwtPayload, options?: IJwtOptions) => {
    const token = await this.jwtService.signAsync(payload, {
      issuer: this.configService.get('JWT_ISSUER'),
      audience: this.configService.get('JWT_AUDIENCE'),
      subject: options?.subject || JwtSubEnum.AUTHENTICATION_TOKEN,
      algorithm: 'RS256',
      secret: this.jwtSecretKey,
      expiresIn:
        options?.expiresIn || this.configService.get('JWT_EXPIRES_AT') || '30d',
    });

    return token;
  };

  async validateToken(token: string) {
    try {
      const decodedData = await this.jwtService.verifyAsync<IJwtDecodedData>(
        token,
        {
          publicKey: this.jwtSecretKey,
        },
      );
      return decodedData;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
