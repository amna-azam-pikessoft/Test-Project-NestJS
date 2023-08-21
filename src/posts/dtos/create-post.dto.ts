import { IsString } from "class-validator";

export class createPostDTO{
    
    @IsString()
    description:string;

    @IsString()
    title:string;
}