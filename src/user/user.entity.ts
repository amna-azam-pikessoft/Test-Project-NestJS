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
}