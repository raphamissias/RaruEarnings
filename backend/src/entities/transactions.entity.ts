import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./users.entity";

@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User

    @Column({ type: "varchar", length: 45})
    name: string

    @Column({ type: "decimal"})
    value: number

    @Column({ type: "boolean", default: false})
    isDiscount: boolean

    @Column({ type: "date" })
    date: string | Date;
}