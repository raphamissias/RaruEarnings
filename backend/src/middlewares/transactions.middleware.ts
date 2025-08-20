import { Request, Response, NextFunction } from "express";
import { TransactionOmitIdSchema } from "../schemas/transaction.schema";
import { ITransactionOmitId } from "../interfaces/models/transactions";

const validateData = async (req: Request, res: Response, next: NextFunction) => {
    const transactionInfo: ITransactionOmitId = TransactionOmitIdSchema.parse(req.body);
    
    req.body = transactionInfo;
        
    next();
}

export { validateData }