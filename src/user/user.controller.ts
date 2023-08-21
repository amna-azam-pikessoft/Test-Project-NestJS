import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { CreateUserDTO } from './dtos/create-user.dto';
import { updateUserDTO } from './dtos/update-user.dto';
import { UserDTO } from './dtos/user.dto';
import { serializeInterceptor } from '../../src/interceptors/serialize.interceptor';
import { AuthGuard } from '../../src/guards/auth.guard';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()

export class UserController {
    
    constructor(private userService:UserService){}

    @UseInterceptors(new serializeInterceptor(UserDTO))
    @Post('/create')
    createUser(@Body() body:CreateUserDTO){
        return this.userService.create(body);
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    async getProfile(@Request() req) {
        return await req.user;
    }

    @UseInterceptors(new serializeInterceptor(UserDTO))
    @UseGuards(AuthGuard)
    @Delete('/:id')
    deleteUser(@Param('id') id:string){
        return this.userService.delete(parseInt(id));
    }

    @UseInterceptors(new serializeInterceptor(UserDTO))
    @UseGuards(AuthGuard)
    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:updateUserDTO){
        return this.userService.update(parseInt(id), body);
    }
}
