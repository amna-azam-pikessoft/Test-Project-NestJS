import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  let mockUserService = {
    create: jest.fn((name:string, email:string,password:string) => { 
      return {
        id:1,
        name:name,
        email:email,
        password:password,
        createdAt:new Date(),
        updatedAt:new Date()
      }
    }),

    update: jest.fn((id, dto)=> {
      return {
        id,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }),

    delete: jest.fn((id)=>{
      return {
        name:"tester",
        email:"test@test.com",
        password:"test",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }),

    retrieve: jest.fn((id)=>{
      return {
        id,
        name:"tester",
        email:"test@test.com",
        password:"test",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:[UserService],
      controllers:[UserController]
    }).overrideProvider(UserService).useValue(mockUserService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = {
      name:"tester",
      email:"test@test.com", 
      password:"test"
    };

    expect(controller.createUser(dto)).toEqual({
      id:expect.any(Number),
      ...dto,
      createdAt:expect.any(Date),
      updatedAt:expect.any(Date),
    });
    expect(mockUserService.create).toHaveBeenCalled()
  })

  it('should update a user', () => {
    const dto = {
      name:"tester",
      email:"test@test.com", 
      password:"test"
    };

    expect(controller.updateUser(1, dto)).toEqual({
      id:1,
      ...dto,
      createdAt:expect.any(Date),
      updatedAt:expect.any(Date),
    });

    expect(mockUserService.update).toHaveBeenCalled()
  })

  it('should delete the user', () => {
    expect(controller.deleteUser(1)).toEqual({
      name:"tester",
      email:"test@test.com",
      password:"test",
      createdAt:expect.any(Date),
      updatedAt:expect.any(Date)
    })
    expect(mockUserService.update).toBeCalled()
  })

  it('should retrieve the user', () => {
    expect(controller.retrieveUser(1)).toEqual({
      id:expect.any(Number),
      name:"tester",
      email:"test@test.com",
      password:"test",
      createdAt:expect.any(Date),
      updatedAt:expect.any(Date)
    })
    expect(mockUserService.retrieve).toBeCalled()
  })
  
});
