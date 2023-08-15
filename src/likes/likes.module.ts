import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PostsModule } from 'src/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './likes.entity';

@Module({
  providers: [LikesService],
  controllers: [LikesController],
  imports:[
    PostsModule,
    TypeOrmModule.forFeature([Likes])]
})
export class LikesModule {}
