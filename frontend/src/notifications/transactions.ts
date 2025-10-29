import { toast } from "react-toastify";

export const notifyTransactionCreate = async (submitReturn: Promise<Response>) => {
    toast.promise(submitReturn, {
        pending: "Criando lançamento",
        success: "Lançamento criado com sucesso!",
        error: {
            render({ data }) {
                return `${data}`
            }
        }
    }, { theme: "dark" });
}

export const notifyTransactionUpdate = async (submitReturn: Promise<Response>) => {
    toast.promise(submitReturn, {
        pending: "Atualizando lançamento",
        success: "Lançamento atualizado com sucesso!",
        error: {
            render({ data }) {
                return `${data}`
            }
        }
    }, { theme: "dark" });
}