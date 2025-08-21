import { createContext, useEffect, useState, useContext } from "react";
import { api } from "../api";
import { DateContext } from "./date";

interface ICustomer {
    id: number;
    name: string;
}

interface ITask {
    id: number;
    name: string;
    value: string;
}

export interface IItem {
    id: number;
    task: ITask;
}

export interface IOrder {
    id: number;
    teeths: string;
    color: string;
    date: string;
    customer: ICustomer;
    items: IItem[];
}

export interface IOrdersProviderProps {
    children: React.ReactNode;
}

interface IOrdersContext {
    ordersList: IOrder[];
    setOrdersList: React.Dispatch<React.SetStateAction<IOrder[] | []>>;
}

export const OrdersContext = createContext({} as IOrdersContext);

const OrdersProvider = ({ children }: IOrdersProviderProps) => {
    const [ordersList, setOrdersList] = useState<IOrder[] | []>([]);
    const { initialDate, finalDate } = useContext(DateContext);

    useEffect(() => {
        const loadData = async () => {
            const { data } = await api.get(`/orders?initialDate=${initialDate}&finalDate=${finalDate}`);
            
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