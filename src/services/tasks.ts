import { tasks_collection } from "../database/index"
import { ITask } from "../interfaces/database";

const createTaskService = async (payload: ITask) => {
    const new_task = payload;
    const task_created = await tasks_collection.insertOne(new_task);

    return task_created;
}

const readTaskService = async () => {
    const tasks = await tasks_collection.find().toArray();

    return tasks;
}

export { readTaskService, createTaskService};