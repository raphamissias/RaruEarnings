import { api } from "../api";
import type { ITransaction } from "../interfaces/transactions.interface";

export const read = async (initialDate: string, finalDate: string): Promise<ITransaction[]> => {
    const { data } = await api.get(`/transactions?initialDate=${initialDate}&finalDate=${finalDate}`);

    return data
}