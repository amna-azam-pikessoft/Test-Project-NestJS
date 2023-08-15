import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Posts) private repo:Repository<Posts>){}

    create(description:string, title:string, user:User){
        const post = this.repo.create({description, title})
        post.user = user;
        return this.repo.save(post)
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
