import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { updateUserDTO } from './dtos/update-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let controller: UserController;

  let mockUserService = {

    create: (dto:CreateUserDTO) => Promise.resolve({...dto}),
    update: (id:string, dto:updateUserDTO)=> Promise.resolve({id, ...dto}),
    delete: (id:number) => Promise.resolve({id, name:"amna", email:"amna@gmail.com", password:"1234"})
    
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:[UserService, JwtService],
      controllers:[UserController]
    }).overrideProvider(UserService).useValue(mockUserService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create the user', async () => {
    const user = await controller.createUser({name:"amna", email:"amna@pikessoft.com", password:"Password@1"})
    expect(user).toBeDefined()
  })

  it('should update the user', async () => {
    const user = await controller.updateUser("1",{name:"amna", email:"amna@pikessoft.com", password:"Password@1"})
    expect(user).toBeDefined()
  })

  it('should delete the user', async () => {
    const user = await controller.deleteUser("1")
    expect(user).toBeDefined()
  })
});
