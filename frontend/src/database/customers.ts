import type { AxiosError } from "axios";
import { api } from "../api";
import type { ICustomer, ICustomerOmitId } from "../interfaces/customers.interface";

export const readCustomer = async (): Promise<ICustomer[]> => {
    try {
        const response = await api.get<ICustomer[]>("/customers");
        return response.data;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const createCustomer = async (data: ICustomerOmitId) => {
    try {
        const newCustomer = await api.post<ICustomer>("/customers", data);
        return newCustomer;
    } catch (error) {
        const currentError = error as AxiosError<string>
        throw currentError
    }
}

export const deleteCustomer = async (id: number) => {
    try {
        const deletedCustomer = await api.delete(`/customers/${id}`);
        return deletedCustomer
    } catch (error) {
        const currentError = error as AxiosError<string>;
        throw currentError;
    }
}

export const updateCustomer = async (id: number, data: ICustomerOmitId) => {
    try {
        const updatedCustomer = await api.patch(`/customers/${id}`, data);
        return updatedCustomer;
    } catch (error) {
        const currentError = error as AxiosError<string>;
        throw currentError;
    }
}