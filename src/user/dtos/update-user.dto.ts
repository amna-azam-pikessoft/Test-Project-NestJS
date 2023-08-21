import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class updateUserDTO{

    @ApiProperty()
    @IsString()
    @IsOptional()
    name:string

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email:string

    @ApiProperty()
    @IsString()
    @IsOptional()
    password:string
}