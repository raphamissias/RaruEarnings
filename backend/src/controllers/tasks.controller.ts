import { Request, Response } from "express"
import { createTaskService, readTaskService, updateTaskService, deleteTaskService } from "../services/tasks.service"
import { Task } from "../entities/tasks.entity";
import { ITaskRead } from "../interfaces/models/tasks";

const createTaskController = async (req: Request, res: Response) => {
    const taskCreated: Task = await createTaskService(req.body);

    return res.status(201).json(taskCreated);
}

const readTaskController = async (req: Request, res: Response) => {
    const tasks: ITaskRead[] = await readTaskService(); 
    
    return res.status(200).json(tasks);
};

const updateTaskController = async (req: Request, res: Response) => {
    const taskUpdated: Task = await updateTaskService(req.params.id, req.body);

    return res.status(200).json(taskUpdated);
}

const deleteTaskController = async (req: Request, res: Response) => {
    await deleteTaskService(req.params.id); 
    
    return res.status(204).json();
};


export { createTaskController, readTaskController, updateTaskController, deleteTaskController };