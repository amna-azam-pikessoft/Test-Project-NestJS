import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateUserDTO{
    
    @ApiProperty()
    @IsString()
    name:string

    @ApiProperty()
    @IsEmail()
    @IsString()
    email:string

    @ApiProperty()
    @IsString()
    password:string

}