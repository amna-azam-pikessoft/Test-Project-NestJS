import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';
import { User } from 'src/user/user.entity';
import { createPostDTO } from './dtos/create-post.dto';

describe('PostsService', () => {
  let service: PostsService;
  let mockPostsRepository = {
    create: (post: createPostDTO) => Promise.resolve({id:1, ...post}),
    save: (post:any) => Promise.resolve({...post}),
    findOneBy: (postID:number) => Promise.resolve({postID, title:"title",description:"description",user:{name:"tester"} as User}),
    remove: (postID:number) => Promise.resolve({postID, title:"title",description:"description",user:{name:"tester"} as User}),
    find: () => Promise.resolve([])
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide:getRepositoryToken(Posts),
          useValue:mockPostsRepository
        }
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a post and return it', async () => {
    const post = await service.create({title:"title", description:"description"} as Posts,
      {id:1, name:"tester", email:"test@test.com"} as User)
    expect(post).toEqual({
      id:1,
      title:"title",
      description:"description",
      user:{
        id:1,
        name:"tester",
        email:"test@test.com"
      }
    })
  });

  it('should throw an error if user is not logged in while creating the post', async () => {
    try{
      const post = await service.create({title:"title", description:"description"},
      {} as User);
      expect(post).toBeDefined()
    }catch(err){
      expect(err.message).toBe("User Not Found")
    }
  })

  it('should update the post', async () => {
    const post = await service.update(1,{title:"title"})
    expect(post).toBeDefined()
  })

  it('should delete the post', async () => {
    const post = await service.delete(1)
    expect(post).toBeDefined()
  })
  
  it('should return all posts', async () => {
    const posts = await service.findAll()
    expect(posts).toBeDefined()
  })

});
