import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes } from 'crypto';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { CreateUserDTO } from "../user/dtos/create-user.dto";
import { SignInUserDTO } from "../user/dtos/signin-user.dto";
var pbkdf2 = require('pbkdf2')

@Injectable()
export class AuthService{
    constructor(private jwtService:JwtService,
        private userService:UserService){}

    hashPassword(password:string){
        try{
            const salt = randomBytes(8).toString('hex')
            var hashedPassword = (pbkdf2.pbkdf2Sync(password, salt, 1, 32, 'sha512')).toString('hex') + '.' + salt
            return hashedPassword;
        }catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    comparePasswords(password:string, hashedPassword:string){
        try{
            const [hash, salt] = hashedPassword.split('.');
            const newHash = (pbkdf2.pbkdf2Sync(password, salt, 1, 32, 'sha512')).toString('hex')
            return newHash === hash;
        }catch(e){
            throw new BadRequestException('Bad Password')
        }
    }
    
    async signup(body:CreateUserDTO){
        try{
            let {email, password} = body;
            let user = await this.userService.retrieve(email)
            if(user)
                throw new BadRequestException('User already exists')
            body.password = this.hashPassword(password)
            return this.userService.create(body)

        }catch(e){
            throw new NotFoundException(e.message)
        }
    }

    async signin(body: SignInUserDTO) {
        const { email, password } = body;
        const user = await this.userService.retrieve(email);
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (!this.comparePasswords(password, user.password)) {
            throw new BadRequestException('Bad password');
        }

        const payload = { sub: user.id, username: user.name };
        const accessToken = await this.jwtService.signAsync(payload);
        return accessToken;
    }
    
}