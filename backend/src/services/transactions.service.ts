import { ITransactionOmitId } from "../interfaces/models/transactions";
import { AppDataSource } from "../data-source";
import { Transaction } from "../entities/transactions.entity";
import { AppError } from "../error";
import { TransactionReadSchema } from "../schemas/transaction.schema";

const createTransactionService = async (payload: ITransactionOmitId) => {
    const transactionRepo = AppDataSource.getRepository(Transaction);

    const transaction: Transaction = transactionRepo.create(payload);

    return await transactionRepo.save(transaction);
};

const readTransactionService = async () => {
    const transactionRepo = AppDataSource.getRepository(Transaction);

    const transactions: Transaction[] = await transactionRepo.find();

    return TransactionReadSchema.parse(transactions);
};

const updateTransactionService = async (transactionId: string, payload: Partial<ITransactionOmitId>) => {
    const transactionRepo = AppDataSource.getRepository(Transaction);

    const transaction: Transaction | null = await transactionRepo.findOneBy({ id: parseInt(transactionId) });
    if (!transaction) throw new AppError("Transaction not found", 404);

    const infoUpdated: Transaction = Object.assign({}, transaction, payload);
    
    return await transactionRepo.save(infoUpdated);
};

const deleteTransactionService = async (transactionId: string) => {
    const transactionRepo = AppDataSource.getRepository(Transaction);

    const transaction: Transaction | null = await transactionRepo.findOneBy({ id: parseInt(transactionId) });
    if (!transaction) throw new AppError("Transaction not found", 404);

    await transactionRepo.delete({id: parseInt(transactionId)});        
};

export { createTransactionService, readTransactionService, updateTransactionService, deleteTransactionService };