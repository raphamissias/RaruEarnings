import { users_collection } from "../database/index"
import { IUser } from "../interfaces/database";

const createUserService = async (payload: IUser) => {
    const new_user = payload;
    const user_created = await users_collection.insertOne(new_user);

    return user_created;
}

const readUserService = async () => {
    const users = await users_collection.find().toArray();

    return users;
}

export { createUserService, readUserService};