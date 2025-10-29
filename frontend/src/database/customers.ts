import type { ICustomer, ICustomerOmitId } from "../interfaces/customers.interface";

const API_URL = "https://script.google.com/macros/s/AKfycbywDCuDWdqYBUcZ3zSJg-4AV45fEmIt9sz5JxXTi9Jcz7fiG0NTCQMGRdc1t89zdKh0/exec?"

export const readCustomer = async (): Promise<ICustomer[]> => {
    try {
        const response = await fetch(`${API_URL}path=customers&action=read`, {
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            }
        });

        const { data, status } = await response.json();
        
        if (status != 200) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw error
    }
}

export const createCustomer = async (name: string, contact: string) => {
    try {
        const response = await fetch(`${API_URL}path=customers&action=create&name=${name}&contact=${contact}`, {
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            }
        });

        const { data, status } = await response.json();
        
        if (status != 201) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw error
    }
}

export const deleteCustomer = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}path=customers&action=delete&id=${id}`, {
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            }
        });

        const { data, status } = await response.json();
        
        if (status != 204) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export const updateCustomer = async (id: number, name: string, contact: string) => {
    try {
        const response = await fetch(`${API_URL}path=customers&action=update&id=${id}&name=${name}&contact=${contact}`, {
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            }
        });

        const { data, status } = await response.json();
        
        if (status != 204) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw error;
    }
}