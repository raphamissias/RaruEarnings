import { Router } from "express"
import { readUserController, createUserController, updateUserController, deleteUserController } from "../controllers/users.controller"
import { validateData } from "../middlewares/users.middleware";

const userRoutes: Router = Router();

userRoutes.get("", readUserController);
userRoutes.post("", validateData, createUserController);
userRoutes.patch("/:id", validateData, updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;