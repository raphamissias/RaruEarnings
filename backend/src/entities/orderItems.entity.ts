import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Order } from "./orders.entity";
import { Task } from "./tasks.entity";

@Entity("orderItems")
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order)
    order: Order;

    @ManyToOne(() => Task)
    task: Task;
}