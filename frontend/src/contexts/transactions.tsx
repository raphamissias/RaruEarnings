import { createContext, useContext, useEffect, useState } from "react";
import { getTransactions } from "../database/transactions";
import { DateContext } from "./date";
import type { ITransaction } from "../interfaces/transactions.interface";

interface ITransactionsProviderProps {
    children: React.ReactNode;
}

interface ITransactionsContext {
    transactionsList: ITransaction[];
    setTransactionsList: React.Dispatch<React.SetStateAction<ITransaction[]>>
    refreshTransactions: boolean;
    setRefreshTransactions: React.Dispatch<React.SetStateAction<boolean>>
}

export const TransactionsContext = createContext({} as ITransactionsContext);

const TransactionsProvider = ({ children }: ITransactionsProviderProps) => {
    const [transactionsList, setTransactionsList] = useState<ITransaction[] | []>([]);
    const { initialDate, finalDate } = useContext(DateContext);
    const [ refreshTransactions, setRefreshTransactions ] = useState<boolean>(false);

    useEffect(() => {
        const readTransactions = async () => {
            try {
                const transactions = await getTransactions(initialDate, finalDate);
    
                setTransactionsList(transactions);
            } catch (error) {  
                console.log(error)
            }
        }

        readTransactions();
    }, [initialDate, finalDate, refreshTransactions]);

    return (
        <TransactionsContext.Provider value={{ transactionsList, setTransactionsList, refreshTransactions, setRefreshTransactions }}>
            { children }
        </TransactionsContext.Provider>
    )
};

export default TransactionsProvider;