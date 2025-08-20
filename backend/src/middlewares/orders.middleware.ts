import { Request, Response, NextFunction } from "express";
import { OrderOmitIdSchema } from "../schemas/order.schema";
import { IOrderOmitId } from "../interfaces/models/orders";

const validateData = async (req: Request, res: Response, next: NextFunction) => {
    const orderInfo: IOrderOmitId = OrderOmitIdSchema.parse(req.body);
    
    req.body = orderInfo;

    next();
}

export { validateData };