import { Request, Response } from "express"
import { readTaskService, createTaskService } from "../services/tasks"

const createTaskController = async (req: Request, res: Response) => {
    const task_created = await createTaskService(req.body);

    return res.status(201).json(task_created);
}

const readTaskController = async (req: Request, res: Response) => {
    const tasks = await readTaskService();

    return res.status(201).json(tasks);
}

export { readTaskController, createTaskController }