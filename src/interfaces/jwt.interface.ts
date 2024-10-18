import { JwtSubEnum } from '../constants/jwt.constants';

export interface IJwtPayload {
  id: string;
  email?: string;
}

export interface IJwtDecodedData extends IJwtPayload {
  iat: number;
  exp: number;
  aud: number;
  iss: number;
  sub: JwtSubEnum;
}

export interface IJwtOptions {
  expiresIn?: string;
  subject?: JwtSubEnum;
}
