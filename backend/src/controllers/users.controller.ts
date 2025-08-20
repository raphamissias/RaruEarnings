import { Request, Response } from "express"
import { createUserService, readUserService, updateUserService, deleteUserService } from "../services/users.service"
import { User } from "../entities/users.entity";

const createUserController = async (req: Request, res: Response) => {
    const userCreated: User = await createUserService(req.body);

    return res.status(201).json(userCreated);
}

const readUserController = async (req: Request, res: Response) => {
    const users: User[] = await readUserService(); 
    
    return res.status(200).json(users);
};

const updateUserController = async (req: Request, res: Response) => {
    const userUpdated: User = await updateUserService(req.params.id, req.body);

    return res.status(200).json(userUpdated);
}

const deleteUserController = async (req: Request, res: Response) => {
    await deleteUserService(req.params.id); 
    
    return res.status(204).json();
};


export { createUserController, readUserController, updateUserController, deleteUserController };