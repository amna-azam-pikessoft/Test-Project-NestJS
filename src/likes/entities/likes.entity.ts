import { Posts } from "../../posts/posts.entity";
import { User } from "../../user/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Likes{

    @PrimaryGeneratedColumn()
    id:number;

    //userID, postID
    @ManyToOne(() => User, (user) => user.likes)
    user:User

    @ManyToOne(() => Posts, (post) => post.likes)
    post:Posts

}