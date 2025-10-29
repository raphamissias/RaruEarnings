import { toast } from "react-toastify"

export const notifyOrderCreate = async (submitReturn: Promise<Response>) => {
    toast.promise(submitReturn, {
        pending: "Criando nota",
        success: "Nota cadastrada com sucesso!",
        error: {
            render({ data }) {
                return `${data}`
            }
        }
    }, { theme: "dark" })
}

export const notifyOrderItemCreate = async (submitReturn: Promise<Response>) => {
    toast.promise(submitReturn, {
        pending: "Adicionando itens",
        success: "Itens adicionados com sucesso!",
        error: {
            render({ data }) {
                return `${data}`
            }
        }
    }, { theme: "dark" })
}

export const notifyOrderUpdate = async (submitReturn: Promise<Response>) => {
    toast.promise(submitReturn, {
        pending: "Atualizando nota",
        success: "Nota atualizada com sucesso!",
        error: {
            render({ data }) {
                return `${data}`
            }
        }
    }, { theme: "dark" })
}

export const notifyOrderItemUpdate = async (submitReturn: Promise<Response>) => {
    toast.promise(submitReturn, {
        pending: "Atualizando item",
        success: "Item atualizado com sucesso!",
        error: {
            render({ data }) {
                return `${data}`
            }
        }
    }, { theme: "dark" })
}