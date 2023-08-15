import { IsOptional, IsString } from "class-validator";

export class updatePostDTO{
    @IsOptional()
    @IsString()
    description:string;

    @IsOptional()
    @IsString()
    title:string;
}