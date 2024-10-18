import { Injectable } from '@nestjs/common';
import { AppJwtService } from 'src/lib/jwt/jwt.service';
import { UserDao } from './user.dao';
import { ICreateUser } from 'src/interfaces/user.interface';
import { PopulateOptions } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: AppJwtService,
    private readonly userDao: UserDao,
  ) {}

  async createUser(createUserProps: ICreateUser) {
    const user = await this.userDao.create(createUserProps);
  }

  async getUserByEmail(
    email: string,
    populate?: PopulateOptions | PopulateOptions | string[],
  ) {
    const user = await this.userDao.findOne({ email }, populate);
    return user;
  }
}
