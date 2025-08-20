import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 75, unique: true })
    name: string;
}