import { Request, Response, NextFunction } from "express";
import { TaskOmidIdSchema } from "../schemas/task.schema";
import { ITaskOmitId } from "../interfaces/models/tasks";

const validateData = async (req: Request, res: Response, next: NextFunction) => {
    const taskInfo: ITaskOmitId = TaskOmidIdSchema.parse(req.body);

    req.body = taskInfo;
        
    next();
}

export { validateData }