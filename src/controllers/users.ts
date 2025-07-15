import { Request, Response } from "express"
import { createUserService, readUserService } from "../services/users"

const createUserController = async (req: Request, res: Response) => {
    const user_created = await createUserService(req.body);

    return res.status(201).json(user_created);
}

const readUserController = async (req: Request, res: Response) => {
    try {
        const users = await readUserService(); 

        return res.status(200).json(users);
    } catch (error) {
        console.log("Erro")
    }
};

export { createUserController, readUserController };