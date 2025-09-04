import style from "./style.module.css"
import DtgCustomers from "./DtgCustomers";
import { useEffect, useState } from "react";
import { createCustomer, readCustomer, type ICustomer, type ICustomerOmitId } from "../../database/customers";
import { useForm } from "react-hook-form";
import { customerSchema } from "../../schemas/customers.schema";
import { toast, ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError, AxiosResponse } from "axios";

const Customers = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<ICustomerOmitId>({
        resolver: zodResolver(customerSchema)
    });

    const getCustomers = async () => {
        const customersArr = await readCustomer();
        setCustomers(customersArr)
    }

    const submit = async (formData: ICustomerOmitId) => {
        try {
            const customer = customerSchema.parse(formData);
            const newCustomer = createCustomer(customer);
            notify(newCustomer);
            getCustomers();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCustomers();
    }, [customers])

const notify = (submitReturn: Promise<AxiosResponse<ICustomer | AxiosError>>) => 
    toast.promise(submitReturn, {
        pending: 'Cadastrando cliente',
        success: 'Cliente cadastrado com sucesso!',
        error: {
            render({ data }) {
                const error = data as AxiosError<{ message?: string }>
                return error.response?.data?.message || "Erro ao cadastrar cliente";
            }
        }
    }, { theme: "dark" });

    return (
        <main>
            <form onSubmit={handleSubmit(submit)} className={style.form}>
                <input type="text" className={errors.name? style.error : ""} placeholder="Digite o nome do cliente" {...register("name")} />
                {errors.name ? <p className={style.errorMessage}>{errors.name.message}</p> : null}
                <button type="submit">Cadastrar cliente</button>
            </form>
            <DtgCustomers customers={customers}/>
            <ToastContainer />
        </main>
    )
}

export default Customers;