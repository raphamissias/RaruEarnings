import { Router } from "express"
import { readTaskController, createTaskController, updateTaskController, deleteTaskController } from "../controllers/tasks.controller"
import { validateData } from "../middlewares/tasks.middlware";

const taskRoutes: Router = Router();

taskRoutes.get("", readTaskController);
taskRoutes.post("", validateData, createTaskController);
taskRoutes.patch("/:id", validateData, updateTaskController);
taskRoutes.delete("/:id", deleteTaskController);

export default taskRoutes;