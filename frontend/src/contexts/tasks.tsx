import { createContext, useEffect, useState } from "react";
import { readTasks } from "../database/tasks";
import type { ITask } from "../interfaces/tasks.interface";

interface ITasksContext {
    tasks: ITask[];
    loadTasks: () => Promise<void>;
}

interface ITasksProviderProps {
    children: React.ReactNode;
}

export const TasksContext = createContext({} as ITasksContext);

export const TasksProvider = ({ children }: ITasksProviderProps) => {
    const [tasks, setTasks] = useState<ITask[] | []>([]);

    const loadTasks = async () => {
        const response = await readTasks();
        setTasks(response);
    }
    
    useEffect(() => {
        loadTasks();
    }, [])

    return (
        <TasksContext.Provider value={{ tasks, loadTasks }}>
            { children }
        </TasksContext.Provider>
    )
}