import { createContext, useEffect, useState } from "react";
import type { IOrderItemOutput } from "../interfaces/orderItems.interface";
import { getOrderItems } from "../database/orderItems";

interface IOrderItemsContext {
    orderItems: IOrderItemOutput[];
    loadOrderItems: () => Promise<void>;
}

interface IOrderItemsProviderProps {
    children: React.ReactNode;
}

export const orderItemsContext = createContext({} as IOrderItemsContext);

export const OrderItemsProvider = ({ children }: IOrderItemsProviderProps) => {
    const [orderItems, setorderItems] = useState<IOrderItemOutput[] | []>([]);

    const loadOrderItems = async () => {
        const response = await getOrderItems();
        setorderItems(response);
    }
    
    useEffect(() => {
        loadOrderItems();
    }, [])

    return (
        <orderItemsContext.Provider value={{ orderItems, loadOrderItems }}>
            { children }
        </orderItemsContext.Provider>
    )
}