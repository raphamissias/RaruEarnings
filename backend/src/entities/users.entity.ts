import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 45})
    name: string;

    @Column({ type: "varchar", length: 45, unique: true})
    email: string;

    @Column({ type: "varchar", length: 120})
    password: string;
}