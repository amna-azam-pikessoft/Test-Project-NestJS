import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(Users) private repo:Repository<Users>){}
    
    async create(body:CreateUserDTO){
        const {name, email, password} = body;
        try{
            const user = this.repo.create({name,email,password});
            return this.repo.save(user);
        }catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id:number){
        try{
            const user = await this.repo.findOneBy({id});
            if(!user)
                throw new NotFoundException('User Not Found');
            return this.repo.remove(user);
        }catch(e){
            throw new NotFoundException('User Not Found');
        }
    }

    async update(id:number, attrs:Partial<Users>){
        try{
            const user = await this.repo.findOneBy({id});
            if(!user)
                throw new NotFoundException('User Not Found');
            Object.assign(user,attrs);
            return this.repo.save(user);
        }catch(e){
            throw new NotFoundException('User Not Found');
        }
    }

    async retrieve(email:string){
        try{
            const user = await this.repo.findOneBy({email});
            return user;
        }
        catch(e){
            throw new NotFoundException('User not found with ID');
        }
    }
        
}
