import { IOrderItemOmitId } from "../interfaces/models/orderItems";
import { AppDataSource } from "../data-source";
import { OrderItem } from "../entities/orderItems.entity";
import { Order } from "../entities/orders.entity";
import { Task } from "../entities/tasks.entity";
import { AppError } from "../error";

const createOrderItemService = async (payload: IOrderItemOmitId) => {
    const orderItemRepo = AppDataSource.getRepository(OrderItem);
    const orderRepo = AppDataSource.getRepository(Order);
    const taskRepo = AppDataSource.getRepository(Task);

    const order = await orderRepo.findOneBy({ id: payload.order });
    if (!order) throw new AppError("Order not found", 404)

    const task = await taskRepo.findOneBy({ id: payload.task });
    if (!task) throw new AppError("Task not found", 404)

    const newOrderItem: OrderItem = orderItemRepo.create({
        order,
        task
    })

    return await orderItemRepo.save(newOrderItem);
};

const readOrderItemService = async () => {
    const orderItemRepo = AppDataSource.getRepository(OrderItem);

    const orderItemQueryBuilder = orderItemRepo.createQueryBuilder("orderItems");

    const orderItems = await orderItemQueryBuilder
    .leftJoinAndSelect("orderItems.order", "order")
    .leftJoinAndSelect("orderItems.task", "task")
    .getMany();

    return orderItems;
};

const updateOrderItemService = async (orderItemId: string, payload: Partial<IOrderItemOmitId>) => {
    const orderItemRepo = AppDataSource.getRepository(OrderItem);

    const orderItem: OrderItem | null = await orderItemRepo.findOneBy({ id: parseInt(orderItemId) });
    if (!orderItem) throw new AppError("Order Item not found.", 404);

    const infoUpdated: OrderItem = Object.assign({}, orderItem, payload);

    return await orderItemRepo.save(infoUpdated);
};

const deleteOrderItemService = async (orderItemId: string) => {
    const orderItemRepo = AppDataSource.getRepository(OrderItem);

    const orderItem: OrderItem | null = await orderItemRepo.findOneBy({ id: parseInt(orderItemId) });
    if (!orderItem) throw new AppError("Order Item not found.", 404);

    await orderItemRepo.delete({id: parseInt(orderItemId) });
};

export { createOrderItemService, readOrderItemService, updateOrderItemService, deleteOrderItemService };