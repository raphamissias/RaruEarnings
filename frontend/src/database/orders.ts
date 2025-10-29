import type { IOrderFormValues } from "../interfaces/orders.interface";

const API_URL = "https://script.google.com/macros/s/AKfycbwOioJivn_0fW1l6JmDgoMWr8eBwNyD3eVU5zYjBd81kbfkLB9CyizhELljd4-ir80gxg/exec?"

export const readOrders = async (initialDate: string, finalDate: string) => {
    try {
        const response = await fetch(`${API_URL}path=orders&action=read`, {
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
        throw error;
    }
}

export const postOrder = async (orderData: IOrderFormValues) => {
    try {
        const response = await fetch(`${API_URL}path=orders&action=create&customer_id=${orderData.customer}&patient=${orderData.patient}&teeths=${orderData.teeths}&color=${orderData.color}&date=${orderData.date}`, {
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            }
        });
        
        const newOrder = await response.json();

        if (newOrder.status != 201) {
            throw new Error(newOrder.data.message)
        }

        return newOrder;
    } catch (error) {
        throw error;
    }
}

export const patchOrder = async (order_id: number, orderData: IOrderFormValues) => {
    try {
        const response = await fetch(`${API_URL}path=orders&action=update&id=${order_id}&customer_id=${orderData.customer}&patient=${orderData.patient}&teeths=${orderData.teeths}&color=${orderData.color}&date=${orderData.date}`, {
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            }
        });
        
        const updatedOrder = await response.json();

        if (updatedOrder.status != 204) {
            throw new Error(updatedOrder.data.message)
        }

        return updatedOrder;
    } catch (error) {
        throw error;
    }
}

export const deleteOrder = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}path=orders&action=delete&id=${id}`, {
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            }
        });

        const deletedOrder = await response.json();

        if (deletedOrder.status != 204) {
            throw new Error(deletedOrder.data.message)
        }

        return deletedOrder;
    } catch (error) {
        throw error;
    }
}
