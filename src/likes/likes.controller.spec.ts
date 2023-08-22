import { Test, TestingModule } from '@nestjs/testing';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { User } from 'src/user/user.entity';

describe('LikesController', () => {
  let controller: LikesController;
  let mockLikesService = {
    addLike: (postID:"1", user:User) => Promise.resolve({id:postID, title:"title", description:"description", "likesCount":3, user:{...user} as User}),
    deleteLike:(postID:"1", user:User) => Promise.resolve({id:postID, title:"title", description:"description", "likesCount":3, user:{...user} as User})
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesController],
      providers:[
        {
          provide:LikesService,
          useValue:mockLikesService
        }
      ]
    }).compile();

    controller = module.get<LikesController>(LikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add like in the post', async () => {
    const post = await controller.addLike("1",{id:1} as User)
    expect(post).toBeDefined()
  })

  it('should remove like of the post', async () => {
    const post = await controller.RemoveLike("1",{id:1} as User)
    expect(post).toBeDefined()
  })
});
