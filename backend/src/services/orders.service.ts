import { IOrderOmitId } from "../interfaces/models/orders";
import { AppDataSource } from "../data-source";
import { Order } from "../entities/orders.entity";
import { AppError } from "../error";
import { User } from "../entities/users.entity";
import { Customer } from "../entities/customers.entity";
import { OrderReadSchema } from "../schemas/order.schema";

const createOrderService = async (payload: IOrderOmitId) => {
    const orderRepo = AppDataSource.getRepository(Order);
    const userRepo = AppDataSource.getRepository(User);
    const customerRepo = AppDataSource.getRepository(Customer)
    
    const user = await userRepo.findOneBy({ id: payload.user });
    if (!user) throw new AppError("User not found", 404);

    const customer = await customerRepo.findOneBy({ id: payload.customer });
    if (!customer) throw new AppError("Customer not found", 404);

    const newOrder: Order = orderRepo.create({
        ...payload,
        user,
        customer
    });
    
    return await orderRepo.save(newOrder);
};

const readOrderService = async (payload: any) => {
    const orderRepo = AppDataSource.getRepository(Order);
    const page: number = Number(payload.page) || 1;
    const perPage: number = 150;

    const finalDate = payload.finalDate || new Date();
    const initialDate = payload.initialDate || new Date(
        finalDate.getFullYear(),
        finalDate.getMonth() -1,
        finalDate.getDay()
    );

    const ordersQueryBuilder = orderRepo.createQueryBuilder("orders");

    const orders: Order[] = await ordersQueryBuilder
        .leftJoinAndSelect("orders.customer", "customer")
        .leftJoinAndSelect("orders.items", "items")
        .leftJoinAndSelect("items.task", "task")
        .where("date >= :initialDate AND date <= :finalDate" , { initialDate: initialDate, finalDate: finalDate })
        .take(perPage)
        .skip(perPage * (page - 1))
        .getMany();

    return OrderReadSchema.parse(orders);
};

const updateOrderService = async (orderId: string, payload: Partial<IOrderOmitId>) => {
    const orderRepo = AppDataSource.getRepository(Order);

    const order: Order | null = await orderRepo.findOneBy({ id: parseInt(orderId) });
    if (!order) throw new AppError("Order not found.", 404);

    const infoUpdated: Order = Object.assign({}, order, payload);
    
    return await orderRepo.save(infoUpdated);
};

const deleteOrderService = async (orderId: string) => {
    const orderRepo = AppDataSource.getRepository(Order);

    const order: Order | null = await orderRepo.findOneBy({ id: parseInt(orderId) });
    if (!order) throw new AppError("Order not found.", 404);

    await orderRepo.delete({id: parseInt(orderId)});
};

export { createOrderService, readOrderService, updateOrderService, deleteOrderService };