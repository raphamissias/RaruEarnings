import { Request, Response } from "express"
import { createOrderItemService, readOrderItemService, updateOrderItemService, deleteOrderItemService } from "../services/orderItems.service"
import { OrderItem } from "../entities/orderItems.entity";

const createOrderItemController = async (req: Request, res: Response) => {
    const orderItemCreated: OrderItem = await createOrderItemService(req.body);

    return res.status(201).json(orderItemCreated);
}

const readOrderItemController = async (req: Request, res: Response) => {
    const orderItems: OrderItem[] = await readOrderItemService(); 
    
    return res.status(200).json(orderItems);
};

const updateOrderItemController = async (req: Request, res: Response) => {
    const orderItemUpdated: OrderItem = await updateOrderItemService(req.params.id, req.body);

    return res.status(200).json(orderItemUpdated);
}

const deleteOrderItemController = async (req: Request, res: Response) => {
    await deleteOrderItemService(req.params.id); 
    
    return res.status(204).json();
};


export { createOrderItemController, readOrderItemController, updateOrderItemController, deleteOrderItemController };