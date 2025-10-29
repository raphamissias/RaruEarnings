import { toast } from "react-toastify"

export const notifyOrderItemDelete = async (submitReturn: Promise<Response>) => {
    toast.promise(submitReturn, {
        pending: "Removendo item",
        success: "Item removido com sucesso!",
        error: {
            render({ data }) {
                return `${data}`
            }
        }
    }, { theme: "dark" })
}
