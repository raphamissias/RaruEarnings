import { tasks_collection } from "../database/index"
import { ITask } from "../interfaces/database";

const createTaskService = async (payload: ITask) => {
    try {
        const new_task = payload;
        const task_created = await tasks_collection.insertOne(new_task);
        
        return task_created;

    } catch (error) {
        console.log(error)
    }
}

const readTaskService = async () => {
    try {
        const tasks = await tasks_collection.find().toArray();

        return tasks;

    } catch (error) {
        console.log(error)
    }
}

export { readTaskService, createTaskService};