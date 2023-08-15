import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comments) private repo:Repository<Comments>,
    private postsService:PostsService){}

    async create(comment:string, postID:number, user:User){
        const commentText = this.repo.create({comment});
        const post = await this.postsService.findByID(postID)
        commentText.post = post;
        commentText.user = user;
        await this.repo.save(commentText)
        return this.postsService.incrementCommentsCount(postID)
    }

    async update(commentID:number,comment:string){
        const commentTxt = await this.repo.findOneBy({id:commentID})
        commentTxt.comment = comment
        return await this.repo.save(commentTxt)
    }





    //----------------------------------------THREAT!!!!
    async delete(postID:number, user:User){

        const comment = await this.repo.find({
            where: {
                user: { id: user.id },
                post: { id: postID },          //what about commentID? How to access it?
            },
        });
      
        if (!comment) 
            throw new NotFoundException('Comment not Found.');
        
        await this.repo.remove(comment);
        return await this.postsService.decrementCommentsCount(postID)
    }


}
