import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from 'src/interceptors/current-user.interceptor';

@Module({
  imports:[
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '150s' },
    }),
],
  providers: [UserService,
    AuthService,
    {
      provide:APP_INTERCEPTOR,
      useClass:CurrentUserInterceptor
    }
  ],
  controllers: [UserController]
})
export class UserModule {}