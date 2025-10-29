import type { IOrderItemOutput } from "../interfaces/orderItems.interface";

const API_URL = "https://script.google.com/macros/s/AKfycbwOioJivn_0fW1l6JmDgoMWr8eBwNyD3eVU5zYjBd81kbfkLB9CyizhELljd4-ir80gxg/exec?"

export const getOrderItems = async (): Promise<IOrderItemOutput[]> => {
    try {
        const response = await fetch(`${API_URL}path=orderItems&action=read`, {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            }
        });
        
        const { data, status } = await response.json();
        
        if (status != 200) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export const postOrderItem = async (order_id: number, task_id: number) => {
    try {
        const response = await fetch(`${API_URL}path=orderItems&action=create&order_id=${order_id}&task_id=${task_id}`, {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            }
        });
        
        const { data, status } = await response.json();
        
        if (status != 201) {
            throw new Error;
        }

        return data;
    } catch (error) {
        throw error
    }
}

export const deleteOrderItem = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}path=orderItems&action=delete&id=${id}`, {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
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

export const patchOrderItem = async (id: number, task_id: number) => {
    try {
        const response = await fetch(`${API_URL}path=orderItems&action=update&id=${id}&task_id=${task_id}`, {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
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