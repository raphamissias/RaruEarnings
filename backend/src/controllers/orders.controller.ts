import { Request, Response } from "express"
import { createOrderService, readOrderService, updateOrderService, deleteOrderService } from "../services/orders.service"
import { Order } from "../entities/orders.entity";

const createOrderController = async (req: Request, res: Response) => {
    const orderCreated: Order = await createOrderService(req.body);

    return res.status(201).json(orderCreated);
}

const readOrderController = async (req: Request, res: Response) => {
    const orders: Order[] = await readOrderService(req.query); 
    
    return res.status(200).json(orders);
};

const updateOrderController = async (req: Request, res: Response) => {
    const orderUpdated: Order = await updateOrderService(req.params.id, req.body);

    return res.status(200).json(orderUpdated);
}

const deleteOrderController = async (req: Request, res: Response) => {
    await deleteOrderService(req.params.id); 
    
    return res.status(204).json();
};


export { createOrderController, readOrderController, updateOrderController, deleteOrderController };