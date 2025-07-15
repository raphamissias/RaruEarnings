import { ObjectId, WithId } from "mongodb"

interface IOrders {
    id: number,
    user_id: number,
    requester_id: number,
    teeths: Array<number>,
    color: string,
    date: string,
    total: number,
}

interface IOrderItems {
    id: number,
    order_id: number,
    task_id: number,
    additional: number,
}

interface ITask {
    _id?: ObjectId,
    name: string,
    value: number,
}

interface IUser {
    _id?: ObjectId,
    name: string,
}

interface IRequesters {
    id: number,
    name: string,
}

export { IOrders, IOrderItems, ITask, IUser, IRequesters }