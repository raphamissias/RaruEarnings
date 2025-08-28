import { api } from "../api"

export interface ITask {
    id: number;
    name: string;
}

export const readTasks = async (): Promise<ITask[]> => {
    const { data } = await api.get("/tasks");

    return data;
}