import { ITaskOmitId } from "../interfaces/models/tasks";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/tasks.entity";
import { AppError } from "../error";
import { TaskReadSchema } from "../schemas/task.schema";

const createTaskService = async (payload: ITaskOmitId) => {
    const taskRepo = AppDataSource.getRepository(Task);

    const task = await taskRepo.findOneBy({ name: payload.name });
    if (task) throw new AppError("Task already registered", 409)

    const newTask: Task = taskRepo.create(payload);

    return await taskRepo.save(newTask);
};

const readTaskService = async () => {
    const taskRepo = AppDataSource.getRepository(Task);

    const tasks: Task[] = await taskRepo.find();

    return TaskReadSchema.parse(tasks);
};

const updateTaskService = async (taskId: string, payload: Partial<ITaskOmitId>) => {
    const taskRepo = AppDataSource.getRepository(Task);

    const task = await taskRepo.findOneBy({ id: parseInt(taskId) });
    if (!task) throw new AppError("Task not found.", 404);

    const infoUpdated: Task = Object.assign({}, task, payload);
    
    return await taskRepo.save(infoUpdated);
};

const deleteTaskService = async (taskId: string) => {
    const taskRepo = AppDataSource.getRepository(Task);

    const task = await taskRepo.findOneBy({ id: parseInt(taskId) });
    if (!task) throw new AppError("Task not found.", 404);

    await taskRepo.delete({id: parseInt(taskId)});    
};

export { createTaskService, readTaskService, updateTaskService, deleteTaskService };