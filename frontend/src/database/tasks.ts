const API_URL = "https://script.google.com/macros/s/AKfycbywDCuDWdqYBUcZ3zSJg-4AV45fEmIt9sz5JxXTi9Jcz7fiG0NTCQMGRdc1t89zdKh0/exec?"

export const readTasks = async () => {
    try {
        const response = await fetch(`${API_URL}path=tasks&action=read`);

        const { data, status } = await response.json();
        
        if (status != 200) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export const createTask = async (name: string, value: number) => {
    try {
        const response = await fetch(`${API_URL}path=tasks&action=create&name=${name}&value=${value}`);
        
        const { data, status } = await response.json();
        
        if (status != 201) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export const deleteTask = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}path=tasks&action=delete&id=${id}`);

        const { data, status } = await response.json();
        
        if (status != 204) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export const updateTask = async (id: number, name: string, value: number) => {
    try {
        const response = await fetch(`${API_URL}path=tasks&action=update&id=${id}&name=${name}&${value}`);

        const { data, status } = await response.json();
        
        if (status != 201) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw error;
    }
}