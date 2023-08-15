import { IsEmail, IsString } from "class-validator";

export class SignInUserDTO{
    
    @IsEmail()
    @IsString()
    email:string

    @IsString()
    password:string

}