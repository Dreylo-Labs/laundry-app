import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDao } from './user.dao';
import { User, UserSchema } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppJwtModule } from 'src/lib/jwt/jwt.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          return schema;
        },
      },
    ]),
    AppJwtModule
  ],
  controllers: [UserController],
  providers: [UserDao, UserService],
  exports: [UserService],
})
export class UserModule {}
