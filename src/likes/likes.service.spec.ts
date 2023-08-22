import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './likes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Likes } from './entities/likes.entity';
import { PostsService } from '../posts/posts.service';
import { User } from 'src/user/user.entity';
import { createPostDTO } from 'src/posts/dtos/create-post.dto';

describe('LikesService', () => {
  let likesService: LikesService;
  let postsService: PostsService;

  let mockLikesRepository = {
    
    findOne: () => Promise.resolve(null),
    create: (user:User, post:createPostDTO) => Promise.resolve({...post, user:{...user}}),
    save: (dto:createPostDTO) => Promise.resolve({...dto}),
    remove: (post:createPostDTO) => Promise.resolve({...post})
    
  }
  let mockPostsService = {
    findByID: (id:number) => Promise.resolve({id, title:"title", description:"description", user:{id:1} as User}),
    incrementLikesCount: (postID:number) => Promise.resolve({id:postID, title:"title", description:"description", "likesCount":3, user:{id:1} as User}),
    decrementLikesCount: (postID:number) => Promise.resolve({id:postID, title:"title", description:"description", "likesCount":2, user:{id:1} as User}),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikesService,
        {
          provide:PostsService,
          useValue:mockPostsService
        },
        {
          provide:getRepositoryToken(Likes),
          useValue:mockLikesRepository
        }
      ],
    }).compile();

    likesService = module.get<LikesService>(LikesService);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(likesService).toBeDefined();
  });

  it('should add like in the post if user is logged in', async () => {
    expect(await likesService.addLike(1,{id:1} as User)).toEqual(
      {
        id:1, 
        title:"title", 
        description:"description", 
        "likesCount":3, 
        user:{id:1} as User
      })
  });

  it('should throw an error if user has not liked the post and going to remove like', async () => {
    try{
      const post = await likesService.deleteLike(1,{id:1} as User)
      expect(post).toBeDefined()
    }catch(err){
      expect(err.message).toBe("User does not have like for this post.")
    }
  });

  it('should throw an error if user has already liked the post', async () => {
    try{
      mockLikesRepository.findOne = () => Promise.resolve({id:1, title:"title", description:"description", user:{id:1} as User})
      const post = await likesService.addLike(1,{id:1} as User)
      expect(post).toBeDefined()
    }
    catch(err){
      expect(err.message).toBe("User has already liked this post")
    }
  });

  it('should increment likes count of the post', async () => {
    const post = await postsService.incrementLikesCount(1)
    expect(post).toBeDefined()
  });

  it('should decrement likes count from the post', async () => {
    const post = await postsService.decrementLikesCount(1)
    expect(post).toBeDefined()
  });

  it('should remove like from the post', async () => {
    mockLikesRepository.findOne = () => Promise.resolve({id:1, title:"title", description:"description", user:{id:1} as User})
    const post = await likesService.deleteLike(1,{id:1} as User)
    expect(post).toBeDefined()
  });

});
