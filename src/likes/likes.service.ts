import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from './likes.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class LikesService {
    constructor(@InjectRepository(Likes) private repo:Repository<Likes>,
    private postsService:PostsService){}

    async addLike(postID:number, user:User){
        const post = await this.postsService.findByID(postID)
        const existingLike = await this.repo.findOne({
            where: {
                user: { id: user.id },
                post: { id: postID },
            },
        });
      
        if (existingLike) {
        throw new NotFoundException('User has already liked this post');
        }

        const like = this.repo.create({ user, post }); 
        await this.repo.save(like);
        return await this.postsService.incrementLikesCount(postID)
    }

    async deleteLike(postID:number, user:User){
        const existingLike = await this.repo.findOne({
            where: {
                user: { id: user.id },
                post: { id: postID },
            },
        });
      
        if (!existingLike) 
            throw new NotFoundException('User does not have like for this post.');

        await this.repo.remove(existingLike);
        return await this.postsService.decrementLikesCount(postID)
    }

}
