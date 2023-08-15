import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/dtos/create-user.dto';
import { updateUserDTO } from 'src/dtos/update-user.dto';
import { serializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from 'src/dtos/user.dto';
import { AuthService } from './auth.service';
import { SignInUserDTO } from 'src/dtos/signin-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
    
    constructor(private userService:UserService, 
        private authService: AuthService){}

    @Post('/signup')
    createUser(@Body() body:CreateUserDTO){
        const {name, email, password} = body;
        console.log(body)
        return this.authService.signup(name,email,password);
    }

    @UseInterceptors(new serializeInterceptor(UserDTO))
    @Get('/signin')
    retrieveUser(@Body() body:SignInUserDTO){
        const {email,password} = body;
        return this.authService.signin(email,password);
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Delete('/:id')
    deleteUser(@Param('id') id:string){
        return this.userService.delete(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:updateUserDTO){
        return this.userService.update(parseInt(id), body);
    }

}
