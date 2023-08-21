import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { createPostDTO } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Posts) private repo:Repository<Posts>){}

    async create(body:createPostDTO, user:User){
        try{
            if(!user.id)
                throw new NotFoundException("User Not Found")
            const post = await this.repo.create(body)
            post.user = user;
            return await this.repo.save(post)
        }catch(err){
            throw new NotFoundException("User Not Found")
        }
        
    }

    async update(postID:number,attrs:Partial<Posts>){
        const post = await this.repo.findOneBy({id:postID});
        if (!post)
            throw new NotFoundException('Post not found');
        Object.assign(post, attrs);
        return this.repo.save(post);
    }

    async delete(postID:number){
        const post = await this.repo.findOneBy({id:postID});
        if (!post)
            throw new NotFoundException('Post not found');
        return this.repo.remove(post);
    }

    async findByID(postID:number){
        const post = await this.repo.findOneBy({id: postID});
        if (!post)
            throw new NotFoundException('Post not found');
        return post;
    }

    async findAll(){
        return await this.repo.find()
    }

    async incrementLikesCount(postID:number){
        const post = await this.repo.findOneBy({id:postID});
        if (!post) 
          throw new NotFoundException('Post not found');
    
        post.likesCount += 1;
        return this.repo.save(post);
    }

    async decrementLikesCount(postID:number){
        const post = await this.repo.findOneBy({id:postID});
        if (!post) 
          throw new NotFoundException('Post not found');
    
        if(post.likesCount > 0)
            post.likesCount -= 1;
        return this.repo.save(post);
    }

    async incrementCommentsCount(postID:number){
        const post = await this.repo.findOneBy({id:postID});
        if (!post)
          throw new NotFoundException('Post not found');
    
        post.commentsCount += 1;
        return this.repo.save(post);
    }

    async decrementCommentsCount(postID:number){
        const post = await this.repo.findOneBy({id:postID});
        if (!post)
          throw new NotFoundException('Post not found');
    
        if(post.commentsCount > 0)
            post.commentsCount -= 1;
        return this.repo.save(post);
    }
}
