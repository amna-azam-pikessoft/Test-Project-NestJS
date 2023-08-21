import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInUserDTO } from 'src/user/dtos/signin-user.dto';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeAuthService = {
    signup: (dto:CreateUserDTO) => Promise.resolve({id:1, ...dto}),
    signin: (dto:SignInUserDTO) => "IAMACCESSTOKEN"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers:[
        {
          provide:AuthService,
          useValue:fakeAuthService
        }
      ]
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create the access token and makes user signin', async() => {
    const accessToken = await controller.retrieveUser({email:"amna@gmail.com",password:"123"})
    expect(accessToken).toEqual("IAMACCESSTOKEN");
  })

  it('should create the user and return it', async() => {
    const user = await controller.createUser({name:"amna", email:"amna@gmail.com", password:"123"})
    expect(user).toBeDefined()
  })


});
