import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICreateUser } from 'src/interfaces/user.interface';
import mongoose, { Model, QueryOptions, PopulateOptions } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.model';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  get Schema() {
    return UserSchema;
  }

  async create(createUserProps: ICreateUser) {
    return await this.userModel.create(createUserProps);
  }

  async findOne(
    query: QueryOptions<User>,
    populate?: PopulateOptions | (PopulateOptions | string)[],
  ) {
    return await this.userModel.findOne(query);
  }
}
