const API_URL = "https://script.google.com/macros/s/AKfycbywDCuDWdqYBUcZ3zSJg-4AV45fEmIt9sz5JxXTi9Jcz7fiG0NTCQMGRdc1t89zdKh0/exec?"

export const getTransactions = async (/* initialDate: string, finalDate: string */) => {
    try {
        const response = await fetch(`${API_URL}path=transactions&action=read`, {
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            }
        });
        
        const newTransaction = await response.json();
        
        if (response.status != 200) {
            throw new Error;
        }

        return newTransaction.data;
    } catch (error) {
        throw error;
    }
}

export const postTransaction = async (name: string, value: number, isDiscount: boolean, date: string) => {
    try {
        const response = await fetch(`${API_URL}path=transactions&action=create&name=${name}&value=${value}&isDiscount=${isDiscount}&date=${date}`, {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            }
        });
        
        const newTransaction = await response.json();
        
        if (newTransaction.status != 201) {
            throw new Error;
        }

        return newTransaction;
    } catch (error) {
        throw error
    }
}

export const deleteTransaction = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}path=transactions&action=delete&id=${id}`, {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            }
        });
        
        const newTransaction = await response.json();
        
        if (newTransaction.status != 204) {
            throw new Error;
        }

        return newTransaction;
    } catch (error) {
        throw error;
    }
}

export const patchTransaction = async (id: number, name: string, value: number, isDiscount: boolean, date: string) => {
    try {
        const response = await fetch(`${API_URL}path=transactions&action=update&id=${id}&name=${name}&value=${value}&isDiscount=${isDiscount}&date=${date}`, {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            }
        });
        
        const newTransaction = await response.json();
        
        if (newTransaction.status != 204) {
            throw new Error;
        }

        return newTransaction;
    } catch (error) {
        throw error;
    }
}