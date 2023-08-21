import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { JwtService } from '@nestjs/jwt';
import { createPostDTO } from './dtos/create-post.dto';
import { User } from 'src/user/user.entity';
import { Posts } from './entities/posts.entity';
import { updatePostDTO } from './dtos/update-post.dto';

describe('PostsController', () => {
  let controller: PostsController;
  let mockPostsService = {
    create: (post:createPostDTO, user:User) => Promise.resolve({id:1, ...post,user:{...user}}),
    findByID: (id:string) => Promise.resolve({id, title:"title", descrption:"description", user:{id:1} as User}),
    update: (postID:string, dto:updatePostDTO) => Promise.resolve({id:postID, ...dto}),
    delete: (id:string) => Promise.resolve({id, title:"title", descrption:"description", user:{id:1} as User}),
    findAll: () => Promise.resolve([])
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        PostsController,
      ],
      providers:[
        JwtService,
        {
          provide:PostsService,
          useValue:mockPostsService
        }
      ]
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a post and return it with user who has created it', async () => {
    const post = await controller.createPost({title:"title", description:"description"},{id:1} as User)
    expect(post).toEqual(
      { id:1, title: 'title', description: 'description', user: { id: 1 } as User}
    )
  });

  it('should update a post', async () => {
    const post = await controller.updatePost("1",{title:"updated title"} as Posts)
    expect(post).toBeDefined()
  });

  it('should delete the post', async () => {
    const post = await controller.deletePost("1")
    expect(post).toBeDefined()
  })
  
  it('should return all posts', async () => {
    const posts = await controller.findAllPosts()
    expect(posts).toBeDefined()
  })
  
  it('should return post', async () => {
    const post = await controller.getPost("1")
    expect(post).toBeDefined()
  })

});
