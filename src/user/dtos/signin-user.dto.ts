import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInUserDTO{
    
    @ApiProperty()
    @IsEmail()
    @IsString()
    email:string

    @ApiProperty()
    @IsString()
    password:string

}