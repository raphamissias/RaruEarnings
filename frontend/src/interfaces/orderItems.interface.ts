import type { ITask, ITaskOutput } from "./tasks.interface";

export interface IOrderItem {
    id: number;
    task: ITask;
}

export interface IOrderItemOutput {
    id: number;
    task: ITaskOutput;
}