import { IsEmail, IsString } from "class-validator";

export class CreateUserDTO{
    
    @IsString()
    name:string

    @IsEmail()
    @IsString()
    email:string

    @IsString()
    password:string

}