import { api } from "../api"
import type { AxiosError } from "axios";

export interface ITask {
    id: number;
    name: string;
    value: number;
}

export type ITaskOmitId = Omit<ITask, 'id'>

export const readTasks = async (): Promise<ITask[]> => {
    try {
        const { data } = await api.get("/tasks");

        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const createTask = async (data: ITaskOmitId) => {
    try {
        const newTask = await api.post<ITask>("/tasks", data);
        return newTask;
    } catch (error) {
        const currentError = error as AxiosError<string>;
        throw currentError;
    }
}

export const deleteTask = async (id: number) => {
    try {
        const deletedTask = await api.delete(`/tasks/${id}`);
        return deletedTask
    } catch (error) {
        const currentError = error as AxiosError<string>;
        throw currentError;
    }
}

export const updateTask = async (id: number, data: ITaskOmitId) => {
    try {
        const updatedTask = await api.patch(`/tasks/${id}`, data);
        return updatedTask;
    } catch (error) {
        const currentError = error as AxiosError<string>;
        throw currentError;
    }
}