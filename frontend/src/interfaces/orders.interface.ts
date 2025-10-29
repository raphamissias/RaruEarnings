import type { IOrderItemInput, IOrderItemOutput } from "./orderItems.interface";

export interface IOrder {
    id: number;
    customer_id: string;
    patient: string,
    teeths: string;
    color: string;
    date: string;
}

export interface IOrderOmitId {
    customer_id: string;
    patient: string,
    teeths: string;
    color: string;
    date: string;
}

export interface IOrderFormValues {
    customer: string;
    patient?: string | undefined;
    items: Record<string, string>;
    teeths: string;
    color: string;
    date: string;
}

export interface IOrderInput {
    id: number;
    customer_id: string;
    patient: string,
    teeths: string;
    color: string;
    date: string;
    newItems?: string[]
    taskName?: string;
}

export interface IOrderOutput {
    id: number;
    customer: {
        id: number,
        name: string
    };
    patient: string,
    teeths: string;
    color: string;
    date: string;
    items: IOrderItemOutput[];
}