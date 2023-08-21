import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { createPostDTO } from './dtos/create-post.dto';
import { updatePostDTO } from './dtos/update-post.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { serializeInterceptor } from '../interceptors/serialize.interceptor';
import { postDTO } from './dtos/post.dto';

@UseInterceptors(new serializeInterceptor(postDTO))
@Controller('posts')
export class PostsController {
    constructor(private postsService:PostsService){}

    @UseGuards(AuthGuard)
    @Post('/create')
    createPost(@Body() body:createPostDTO, @CurrentUser() user:User){
        return this.postsService.create(body, user);
    }

    @Get('/:postID')
    getPost(@Param('postID') postID:string){
        return this.postsService.findByID(parseInt(postID))
    }

    @Patch('/:postID')
    updatePost(@Param('postID') postID:string, @Body() body:updatePostDTO){
        return this.postsService.update(parseInt(postID),body)
    }

    @Delete('/:postID')
    deletePost(@Param('postID') postID:string){
        return this.postsService.delete(parseInt(postID))
    }

    @Get()
    findAllPosts(){
        return this.postsService.findAll()
    }

}
