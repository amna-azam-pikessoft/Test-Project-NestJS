import { IsString } from "class-validator";

export class addCommentDTO{
    @IsString()
    comment:string
}