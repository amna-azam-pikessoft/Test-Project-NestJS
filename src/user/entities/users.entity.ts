import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users{
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

}