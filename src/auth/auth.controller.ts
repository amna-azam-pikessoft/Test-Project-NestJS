import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from '../user/dtos/create-user.dto';
import { SignInUserDTO } from '../user/dtos/signin-user.dto';
import { AuthService } from './auth.service';
import { serializeInterceptor } from '../../src/interceptors/serialize.interceptor';
import { UserDTO } from '../user/dtos/user.dto';
import { ApiTags } from "@nestjs/swagger"
@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(new serializeInterceptor(UserDTO))

export class AuthController {

    constructor(private authService:AuthService){}

    @Post('/signup')
    createUser(@Body() body:CreateUserDTO){
        return this.authService.signup(body);
    }

    @Post('/signin')
    retrieveUser(@Body() body:SignInUserDTO){
        return this.authService.signin(body);
    }
}

