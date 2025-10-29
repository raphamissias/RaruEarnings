import { toast } from "react-toastify";

export const notifyCustomerCreate = async (submitReturn: Promise<Response>) => {
    toast.promise(submitReturn, {
        pending: "Salvando cliente",
        success: "Cliente salvo com sucesso!",
        error: {
            render({ data }) {
                return `${data}`
            }
        }
    }, { theme: "dark" });
}

export const notifyCustomerUpdate = async (submitReturn: Promise<Response>) => {
    toast.promise(submitReturn, {
        pending: "Atualizando cliente",
        success: "Cliente atualizado com sucesso!",
        error: {
            render({ data }) {
                return `${data}`
            }
        }
    }, { theme: "dark" });
}

export const notifyCustomerDelete = async (submitReturn: Promise<Response>) => {
    toast.promise(submitReturn, {
        pending: "Removendo cliente",
        success: "Cliente removido com sucesso!",
        error: {
            render({ data }) {
                return `${data}`
            }
        }
    }, { theme: "dark" })
}