import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import { updateUserDTO } from 'src/user/dtos/update-user.dto';
import { serializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from 'src/user/dtos/user.dto';
import { AuthService } from './auth.service';
import { SignInUserDTO } from 'src/user/dtos/signin-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './user.entity';

@UseInterceptors(new serializeInterceptor(UserDTO))
@Controller('user')
export class UserController {
    
    constructor(private userService:UserService, 
        private authService: AuthService){}

    @Post('/signup')
    createUser(@Body() body:CreateUserDTO){
        const {name, email, password} = body;
        return this.authService.signup(name,email,password);
    }

    @Post('/signin')
    retrieveUser(@Body() body:SignInUserDTO){
        const {email,password} = body;
        return this.authService.signin(email,password);
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    getProfile(@CurrentUser() currentUser:User) {
        return currentUser;
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
