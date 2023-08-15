import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo:Repository<User>){}
    
    async create(name:string, email:string, password:string){
        const user = this.repo.create({name,email,password});
        return this.repo.save(user);
    }

    async delete(id:number){
        const user = await this.repo.findOneBy({id});
        if(!user)
            throw new NotFoundException('User not found with ID : ' + id);
        return this.repo.remove(user);
    }

    async update(id:number, attrs:Partial<User>){
        const user = await this.repo.findOneBy({id});
        if(!user)
            throw new NotFoundException('User not found with this ID : ' + id)
        Object.assign(user,attrs);
        return this.repo.save(user);
    }

    async retrieve(email:string){
        const user = await this.repo.findOneBy({email});
        if(!user)
            throw new NotFoundException('User not Found with this email : ' + email)
        return user;
    }

    async retrieveByID(id:number){
        const user = await this.repo.findOneBy({id});
        if(!user)
            throw new NotFoundException('User not Found with this id : ' + id)
        return user;
    }
}
