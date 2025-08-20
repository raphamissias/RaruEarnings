import { Request, Response, NextFunction } from "express";
import { CustomerOmitIdSchema } from "../schemas/customer.schema";
import { ICustomerOmitId } from "../interfaces/models/customers";

const validateData = async (req: Request, res: Response, next: NextFunction) => {
    const customerInfo: ICustomerOmitId = CustomerOmitIdSchema.parse(req.body);
    
    req.body = customerInfo;

    next();
}

export { validateData }