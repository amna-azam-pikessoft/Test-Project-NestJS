import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsModule } from 'src/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports:[PostsModule,
  TypeOrmModule.forFeature([Comments])]
})
export class CommentsModule {}
