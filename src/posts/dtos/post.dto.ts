import { Expose, Transform } from "class-transformer";

export class postDTO{

    @Expose()
    id:number;

    @Expose()
    title:string;

    @Expose()
    description:string;

    @Expose()
    likesCount:number;

    @Expose()
    commentsCount:number;

    @Transform(({obj}) => obj.user.id)
    @Expose()
    userID:number

}