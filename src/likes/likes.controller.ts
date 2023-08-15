import { Controller, Delete, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('likes')
export class LikesController {
    constructor(private likesService:LikesService){}

    @Post('/:postID')
    addLike(@Param('postID') postID:string, @CurrentUser() currentUser:User){
        return this.likesService.addLike(parseInt(postID),currentUser)
    }

    @Delete('/:postID')
    RemoveLike(@Param('postID') postID:string, @CurrentUser() currentUser:User){
        return this.likesService.deleteLike(parseInt(postID), currentUser)
    }

}
