import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    req['startTime'] = Date.now();
    req['uniqueId'] = uuidv4();
    next();
  }
}
