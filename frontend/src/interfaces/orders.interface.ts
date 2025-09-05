import type { ICustomer } from "./customers.interface";
import type { IOrderItem, IOrderItemOutput } from "./orderItems.interface";

export interface IOrder {
    id: number;
    teeths: string;
    color: string;
    date: string;
    customer: ICustomer;
    items: IOrderItem[];
}

export interface IOrderOutput {
    id: number;
    teeths: string;
    color: string;
    date: string;
    customer: ICustomer;
    items: IOrderItemOutput[];
}