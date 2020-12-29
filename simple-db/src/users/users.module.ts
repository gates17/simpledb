import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Global()
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
