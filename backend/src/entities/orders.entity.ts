import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from "typeorm"
import { User } from "./users.entity";
import { Customer } from "./customers.entity";
import { OrderItem } from "./orderItems.entity";

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Customer)
    customer: Customer;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    items: OrderItem[];

    @Column({ type: "varchar", length: 75, nullable: true })
    patient: string;

    @Column({ type: "varchar", length: 45})
    teeths: string;

    @Column({ type: "varchar", length: 45})
    color: string;

    @Column({ type: "date" })
    date: string | Date;
}