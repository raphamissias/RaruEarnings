export interface ITask {
    id: number;
    name: string;
    value: number;
}

export interface ITaskOutput {
    id: number;
    name: string;
    value: string;
}

export type ITaskOmitId = Omit<ITask, 'id'>

export interface ITaskFormValues {
    name: string;
    value: string;
}