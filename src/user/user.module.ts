import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { CurrentUserInterceptor } from 'src/interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Posts } from 'src/posts/posts.entity';

@Module({
  imports:[
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([User, Posts]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
],
  providers: [
    UserService,
    AuthService,
    {
      provide:APP_INTERCEPTOR,
      useClass:CurrentUserInterceptor
    }
   ],           //INTERCEPTOR HAS BEEN ADDED IN DEPENDENCY INJECTION
  controllers: [UserController]
})
export class UserModule {}