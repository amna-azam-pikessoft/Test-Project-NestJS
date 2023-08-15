import { Comments } from "src/comments/comments.entity";
import { Likes } from "src/likes/likes.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Posts{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    description:string;

    @Column()
    title:string;

    @Column({default:0})
    likesCount:number;

    @Column({default:0})
    commentsCount:number;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @ManyToOne(() => User, (user) => user.posts)
    user:User

    //userID

    //one post has many comments.
    //Many comments has one post.
    @OneToMany(() => Comments, (comment) => comment.post)
    comments:Comments[]

    //one post has many likes.
    //Many likes has one post.
    @OneToMany(() => Likes, (likes) => likes.post)
    likes:Likes[]


}