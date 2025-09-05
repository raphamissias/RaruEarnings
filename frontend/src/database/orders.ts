import type { AxiosError } from "axios";
import { api } from "../api";
import type { IOrder } from "../interfaces/orders.interface";

export const readOrders = async (initialDate: string, finalDate: string) => {
    try {
        const { data } = await api.get(`/orders?initialDate=${initialDate}&finalDate=${finalDate}`);
        return data;
    } catch (error) {
        const currentError = error as AxiosError<string>;
        throw currentError;
    }
}

export const createOrder = async (data: IOrder) => {
    try {
        const newOrder = api.post('/orders', data);
        return newOrder;
    } catch (error) {
        const currentError = error as AxiosError<string>;
        throw currentError;
    }
}