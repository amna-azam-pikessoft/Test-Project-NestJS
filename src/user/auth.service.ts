import { BadRequestException, Injectable, NotFoundException, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes } from 'crypto';
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
var pbkdf2 = require('pbkdf2')

@Injectable()
export class AuthService{
    constructor(private userService:UserService,
        private jwtService:JwtService){}

    hashPassword(password:string){
        const salt = randomBytes(8).toString('hex')
        var hashedPassword = (pbkdf2.pbkdf2Sync(password, salt, 1, 32, 'sha512')).toString('hex') + '.' + salt
        return hashedPassword;
    }

    comparePasswords(password:string, hashedPassword:string){
        const [hash, salt] = hashedPassword.split('.');
        const newHash = (pbkdf2.pbkdf2Sync(password, salt, 1, 32, 'sha512')).toString('hex')
        return newHash === hash;
    }
    
    signup(name:string, email:string, password:string){
        password = this.hashPassword(password)
        return this.userService.create(name, email, password)
    }

    async signin(email:string, password:string){
        const user = await this.userService.retrieve(email)
        if(!user)
            throw new NotFoundException('user not found')
        if(!this.comparePasswords(password,user.password))
            throw new BadRequestException('Bad password')

        const payload = { sub: user.id, username: user.name };
        const accessToken = await this.jwtService.signAsync(payload);
        return accessToken;
    }
}