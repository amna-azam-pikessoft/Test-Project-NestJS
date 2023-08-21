import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    UserModule,
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
