import type { ITask } from "./tasks.interface";

export interface IOrderItem {
    id: number;
    order_id: number;
    task_id: number;
}

export interface IOrderItemInput {
    order_id: number;
    task_id: number;
}

export interface IOrderItemOutput {
    id: number | string;
    task: ITask;
}

export type tOrderItemOmitId = Omit<IOrderItem, 'id'>

export type tPartialOrderItem = Partial<tOrderItemOmitId>