import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppJwtService } from './jwt.service';

@Module({
  imports: [JwtModule],
  providers: [AppJwtService],
  exports: [AppJwtService],
})
export class AppJwtModule {}
