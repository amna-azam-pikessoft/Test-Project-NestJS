import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Posts } from './posts/posts.entity';
import { PostsModule } from './posts/posts.module';
import { Likes } from './likes/likes.entity';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    PostsModule,
    LikesModule,
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.POSTGRES_HOST,
      port:parseInt(<string>process.env.POSTGRES_PORT),
      username:process.env.POSTGRES_USER,
      password:process.env.POSTGRES_PASSWORD,
      database:process.env.POSTGRES_DATABASE,
      synchronize:true,
      entities:[User, Posts, Likes]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
