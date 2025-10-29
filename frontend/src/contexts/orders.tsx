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
    refreshOrders: boolean;
    setRefreshOrders: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OrdersContext = createContext({} as IOrdersContext);

const OrdersProvider = ({ children }: IOrdersProviderProps) => {
    const [ordersList, setOrdersList] = useState<IOrderOutput[] | []>([]);
    const { initialDate, finalDate } = useContext(DateContext);
    const [refreshOrders, setRefreshOrders] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const response = await readOrders(/*initialDate, finalDate*/);

            setOrdersList(response);
        }

        loadData();
    }, [initialDate, finalDate, refreshOrders]);

    return (
        <OrdersContext.Provider value={{ ordersList, setOrdersList, refreshOrders, setRefreshOrders }}>
            { children }
        </OrdersContext.Provider>
    );
};

export default OrdersProvider;