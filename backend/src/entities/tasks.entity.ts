import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: "varchar", length: 45, unique: true})
    name: string;

    @Column({ type: "decimal"})
    value: number;
}