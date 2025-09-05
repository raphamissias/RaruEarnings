import { createContext, useEffect, useState, useContext } from "react";
import { DateContext } from "./date";
import { readOrders } from "../database/orders";
import type { IOrderOutput } from "../interfaces/orders.interface";

export interface IOrdersProviderProps {
    children: React.ReactNode;
}

interface IOrdersContext {
    ordersList: IOrderOutput[];
    setOrdersList: React.Dispatch<React.SetStateAction<IOrderOutput[] | []>>;
}

export const OrdersContext = createContext({} as IOrdersContext);

const OrdersProvider = ({ children }: IOrdersProviderProps) => {
    const [ordersList, setOrdersList] = useState<IOrderOutput[] | []>([]);
    const { initialDate, finalDate } = useContext(DateContext);

    useEffect(() => {
        const loadData = async () => {
            const data = await readOrders(initialDate, finalDate);
            
            setOrdersList(data);
        }

        loadData();
    }, [initialDate, finalDate]);

    return (
        <OrdersContext.Provider value={{ ordersList, setOrdersList }}>
            { children }
        </OrdersContext.Provider>
    );
};

export default OrdersProvider;