import { api } from "../api";

export interface ICustomer {
    id: number;
    name: string;
}

export const readCustomer = async (): Promise<ICustomer[]> => {
    const { data } = await api.get("/customers");

    return data;
}