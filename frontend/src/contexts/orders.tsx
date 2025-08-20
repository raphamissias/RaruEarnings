import { createContext, useEffect, useState, useContext } from "react";
import { api } from "../api";
import { DateContext } from "./date";

export const OrdersContext = createContext({});

const OrdersProvider = ({ children }) => {
    const [ordersList, setOrdersList] = useState();
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