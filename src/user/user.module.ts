import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '150s' },
    }),
],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}