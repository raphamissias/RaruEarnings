import { IUserOmitId } from "../interfaces/models/users";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../error";

const createUserService = async (payload: IUserOmitId) => {
    const userRepo = AppDataSource.getRepository(User);
    
    const user: User = userRepo.create(payload);
    
    return await userRepo.save(user);
};

const readUserService = async () => {
    const userRepo = AppDataSource.getRepository(User);

    const users: User[] = await userRepo.find();

    return users;
};

const updateUserService = async (userId: string, payload: Partial<IUserOmitId>) => {
    const userRepo = AppDataSource.getRepository(User);

    const user: User | null = await userRepo.findOneBy({ id: parseInt(userId) });
    if (!user) throw new AppError("User not found", 404);

    const infoUpdated: User = Object.assign({}, user, payload);
    
    return await userRepo.save(infoUpdated);
};

const deleteUserService = async (userId: string) => {
    const userRepo = AppDataSource.getRepository(User);

    const user: User | null = await userRepo.findOneBy({ id: parseInt(userId) });
    if (!user) throw new AppError("User not found", 404);

    await userRepo.delete({id: parseInt(userId)});
};

export { createUserService, readUserService, updateUserService, deleteUserService };