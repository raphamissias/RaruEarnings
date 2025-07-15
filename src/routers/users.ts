import { Router } from "express"
import { readUserController, createUserController } from "../controllers/users"

const userRoutes: Router = Router();

userRoutes.post("", createUserController);
userRoutes.get("", readUserController);

export default userRoutes