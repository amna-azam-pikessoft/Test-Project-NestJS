import { Comments } from "src/comments/comments.entity";
import { Likes } from "src/likes/likes.entity";
import { Posts } from "src/posts/posts.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatredAt:Date;

    //User has many posts.
    //Many posts has one user.

    @OneToMany(() => Posts, (post) => post.user)
    posts:Posts[]

    //User has written many comments.
    //Many comments has one user.

    @OneToMany(() => Comments, (comment) => comment.user)
    comments:Comments[]

    //User has done many likes.
    //Many likes has one user.

    @OneToMany(() => Likes, (like) => like.user)
    likes:Likes[]

}