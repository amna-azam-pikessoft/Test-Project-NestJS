import { Posts } from "src/posts/posts.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    comment:string;

    //userID, postID
    @ManyToOne(()=>User, (user)=>user.comments)
    user:User

    @ManyToOne(()=>Posts, (post)=>post.comments)
    post:Posts

}