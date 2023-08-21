import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  exports:[PostsService],
  imports:[
    TypeOrmModule.forFeature([Posts])
  ]
})
export class PostsModule {}
