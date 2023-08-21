import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
