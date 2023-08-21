import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  let fakeUserService = {
    retrieve: () => Promise.resolve(null),
    create: (body:CreateUserDTO) => Promise.resolve({id:1, ...body})
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide:UserService,
          useValue:fakeUserService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with salted and hashed password', async () => {
    const user = await service.signup({name:"amna",email:"amna@gmail.com",password:"Password@1"})
    expect(user.password).not.toEqual("password@1")
    const [salt, hash] = user.password.split('.')
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it('throws an error if user signs up with email that is in use', async () => {    
    try {
      fakeUserService.retrieve = () => Promise.resolve({id: 1, name: "a", email:"amna@gmail.com", password: "p@1"});
      await service.signup({name: "amna", email: "amna@gmail.com", password: "Password@1"});
    } catch (error) {
      expect(error.message).toBe("User already exists");
    }
  });

  it('should throw an error if signin is called with unused email', async () => {
    
    fakeUserService.retrieve = () => Promise.resolve(null);
    expect(service.signin({ email: "amna@gmail.com", password: "Password@1" })).rejects.toThrow(NotFoundException);

  });

  it('should throw an error if incorrect password is given', async () => {
    fakeUserService.retrieve = () => Promise.resolve({
      id: 1, 
      name: "a", 
      email:"amna@gmail.com", 
      password: "Password@1"
    });
    expect(service.signin({ email: "amna@gmail.com", password: "Password@1" })).rejects.toThrow(BadRequestException);
  })
});
