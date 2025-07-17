import { ObjectId } from "mongodb";
import { users_collection } from "../database/index"
import { IUser, IUserId } from "../interfaces/database";

const createUserService = async (payload: IUser) => {
    try {
        const new_user = payload;
        const user_created = await users_collection.insertOne(new_user);

        return user_created;

    } catch (error) {
        console.log(error)
    }
}

const readUserService = async () => {
    try {
        const users = await users_collection.find().toArray();

        return users;

    } catch (error) {
        console.log(error)
    }
}

const updateUserService = async (payload: IUser) => {
    try {
        const user_id = new ObjectId(payload._id);
        const info_to_update = {
            name: payload.name
        };

        const user_updated = await users_collection.updateOne({_id: user_id}, {$set: {info_to_update}});

        return user_updated;

    } catch (error) {
        console.log(error)
    }
}

const deleteUserService = async (payload: IUserId) => {
    try {
        const user_id = new ObjectId(payload._id);
        const user_deleted = await users_collection.deleteOne({_id: user_id});

        return user_deleted;

    } catch (error) {
        console.log(error)
    }
}

export { createUserService, readUserService, updateUserService, deleteUserService };