import { User } from "../../user/user.entity";
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



}