import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { addCommentDTO } from './dtos/create-comment.dto';
import { updateCommentDTO } from './dtos/update-comment.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService:CommentsService){}

    @Post('/addComment')
    addComment(@Body() body:addCommentDTO, @Param() postID:string, @CurrentUser() user:User){
        return this.commentsService.create(body.comment, parseInt(postID), user)
    }

    @Patch('/:commentID')
    updateComment(@Param() commentID:string, @Body() body:updateCommentDTO){
        return this.commentsService.update(parseInt(commentID), body.comment)
    }

    @Delete('/:commentID')
    deleteComment(@Param() postID:string, @CurrentUser() user:User){
        return this.commentsService.delete(parseInt(postID), user)
    }
}
