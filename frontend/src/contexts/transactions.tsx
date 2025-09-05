import { createContext, useContext, useEffect, useState } from "react";
import { read } from "../database/transactions";
import { DateContext } from "./date";
import type { ITransaction } from "../interfaces/transactions.interface";

interface ITransactionsProviderProps {
    children: React.ReactNode;
}

interface ITransactionsContext {
    transactionsList: ITransaction[];
    setTransactionsList: React.Dispatch<React.SetStateAction<ITransaction[]>>
}

export const TransactionsContext = createContext({} as ITransactionsContext);

const TransactionsProvider = ({ children }: ITransactionsProviderProps) => {
    const [transactionsList, setTransactionsList] = useState<ITransaction[] | []>([]);
    const { initialDate, finalDate } = useContext(DateContext);

    useEffect(() => {
        const readTransactions = async () => {
            const transactions = await read(initialDate, finalDate);

            setTransactionsList(transactions);
        }

        readTransactions();
    }, [initialDate, finalDate])

    return (
        <TransactionsContext.Provider value={{ transactionsList, setTransactionsList }}>
            { children }
        </TransactionsContext.Provider>
    )
};

export default TransactionsProvider;