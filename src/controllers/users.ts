import { Request, Response } from "express"
import { createUserService, readUserService, updateUserService, deleteUserService } from "../services/users"

const createUserController = async (req: Request, res: Response) => {
    const user_created = await createUserService(req.body);

    return res.status(201).json(user_created);
}

const readUserController = async (req: Request, res: Response) => {
    const users = await readUserService(); 
    
    return res.status(200).json(users);
};

const updateUserController = async (req: Request, res: Response) => {
    const user_updated = await updateUserService(req.body);

    return res.status(201).json(user_updated);
}

const deleteUserController = async (req: Request, res: Response) => {
    const user = await deleteUserService(req.body); 
    
    return res.status(200).json(user);
};


export { createUserController, readUserController, updateUserController, deleteUserController };