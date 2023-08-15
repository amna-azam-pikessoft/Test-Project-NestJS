import { IsString } from "class-validator";

export class updateCommentDTO{
    @IsString()
    comment:string
}