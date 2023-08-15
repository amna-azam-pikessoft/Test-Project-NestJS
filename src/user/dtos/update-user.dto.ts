import { IsEmail, IsOptional, IsString } from "class-validator";

export class updateUserDTO{

    @IsString()
    @IsOptional()
    name:string

    @IsEmail()
    @IsOptional()
    email:string

    @IsString()
    @IsOptional()
    password:string
}