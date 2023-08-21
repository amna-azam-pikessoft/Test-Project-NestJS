import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Users } from './entities/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updateUserDTO } from './dtos/update-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';

describe('UserService', () => {
  let service: UserService;
  let fakeUserRepository = {
    
    create: (user:CreateUserDTO) => Promise.resolve({id:1, ...user}),
    
    save: (user:updateUserDTO) => Promise.resolve({id:1, ...user}),

    remove: (id:number) => Promise.resolve({id, name:"amna" ,password:"Password@1" ,email:"amna@gmail.com"}),

    findOneBy: (id:number) => Promise.resolve({id, name:"amna" ,password:"Password@1" ,email:"amna@gmail.com"})
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
    providers:[
      UserService,
      {
        provide: getRepositoryToken(Users),
        useValue:fakeUserRepository
      }
    ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update the user', async () => {
    const user = await service.update(1, {});
    expect(user).toBeDefined()

  });
  
  it('should delete the user', async () => {
    expect(await service.delete(1)).toBeDefined()
  })

  it('should throw an error if user not found', async () => {

    try {
        fakeUserRepository.findOneBy = () => Promise.resolve(null)
        expect(await service.delete(1))
    } catch (error) {
        expect(error.message).toBe("User Not Found");
      }
  })

//   it('should retrieve the user', async () => {
//     fakeUserRepository.findOneBy = (id:number) => Promise.resolve({id:1, name:"amna" ,password:"Password@1" ,email:"amna@pikessoft.com"})
//     const user = await service.retrieve(1)
//     expect(user).toBeDefined()
//   })

  
});
