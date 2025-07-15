import { Router } from "express"
import { readTaskController, createTaskController } from "../controllers/tasks";

const taskRoutes: Router = Router();

taskRoutes.get("", readTaskController);
taskRoutes.post("", createTaskController);

export default taskRoutes