import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository = {
    
    create: jest.fn().mockImplementation((dto) => dto),
    
    save:jest.fn().mockImplementation(user => Promise.resolve({
      id:1,
      ...user,
      createdAt:new Date(),
      updatedAt:new Date()
    }
    )),

    remove: jest.fn().mockImplementation(user => user),

    findOneBy: jest.fn().mockImplementation(idObj => Promise.resolve({
      id: idObj.id,
      name:"tester",
      email:"test@test.com",
      password:"test",
      createdAt:new Date(),
      updatedAt:new Date()
    }
    ))
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
    providers:[
      UserService,
      {
        provide: getRepositoryToken(User),
        useValue:mockUserRepository
      }
    ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with salted and hashed password', async () => {
    const user = await service.create("tester", "test@test.com", "test")
    expect(user.password).not.toEqual('test');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();

    expect(mockUserRepository.create).toBeCalled()
    expect(mockUserRepository.save).toBeCalled()
  })

  it('should update the user', async () => {
    const user = await service.update(1, {});
    expect(user).toEqual({
      id: 1,
      name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      createdAt:expect.any(Date),
      updatedAt:expect.any(Date),
    });

    expect(mockUserRepository.findOneBy).toBeCalled()
    expect(mockUserRepository.save).toBeCalled()
  });
  
  it('should delete the user', async () => {
    expect(await service.delete(1)).toEqual({
      id: 1,
      name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      createdAt:expect.any(Date),
      updatedAt:expect.any(Date),
    })
  })

  it('should retrieve the user', async () => {
    expect(await service.retrieve(1)).toEqual({
      id: 1,
      name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      createdAt:expect.any(Date),
      updatedAt:expect.any(Date),
    })
  })

  it('should throw an error if user not found', async () => {
    expect(await service.retrieve(1)).rejects.toThrow(NotFoundException)
  })
  
});
