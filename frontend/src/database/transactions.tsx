import { api } from "../api";

export interface ITransaction {
    id: number;
    name: string;
    value: string;
    isDiscount: boolean;
    date: string;
}

export const read = async (initialDate: string, finalDate: string): Promise<ITransaction[]> => {
    const { data } = await api.get(`/transactions?initialDate=${initialDate}&finalDate=${finalDate}`);

    return data
}