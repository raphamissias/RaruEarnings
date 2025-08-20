import { Request, Response } from "express"
import { createTransactionService, readTransactionService, updateTransactionService, deleteTransactionService } from "../services/transactions.service"
import { Transaction } from "../entities/transactions.entity";

const createTransactionController = async (req: Request, res: Response) => {
    const transactionCreated: Transaction = await createTransactionService(req.body);

    return res.status(201).json(transactionCreated);
}

const readTransactionController = async (req: Request, res: Response) => {
    const transactions: Transaction[] = await readTransactionService(); 
    
    return res.status(200).json(transactions);
};

const updateTransactionController = async (req: Request, res: Response) => {
    const transactionUpdated: Transaction = await updateTransactionService(req.params.id, req.body);

    return res.status(200).json(transactionUpdated);
}

const deleteTransactionController = async (req: Request, res: Response) => {
    await deleteTransactionService(req.params.id); 
    
    return res.status(204).json();
};


export { createTransactionController, readTransactionController, updateTransactionController, deleteTransactionController };