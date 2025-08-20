import { Request, Response, NextFunction } from "express";
import { OrderItemOmitIdSchema } from "../schemas/orderItem.schema";
import { IOrderItemOmitId } from "../interfaces/models/orderItems";

const validateData = async (req: Request, res: Response, next: NextFunction) => {
    const orderItemInfo: IOrderItemOmitId = OrderItemOmitIdSchema.parse(req.body);
    
    req.body = orderItemInfo;

    next();
}

export { validateData }