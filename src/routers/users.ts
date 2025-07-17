import { Router } from "express"
import { readUserController, createUserController, updateUserController, deleteUserController } from "../controllers/users"

const userRoutes: Router = Router();

userRoutes.post("", createUserController);
userRoutes.get("", readUserController);
userRoutes.patch("", updateUserController);
userRoutes.delete("", deleteUserController);

export default userRoutes