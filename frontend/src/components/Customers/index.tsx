import style from "./style.module.css"
import DtgCustomers from "./DtgCustomers";
import { useEffect, useState } from "react";
import { postCustomer, getCustomer } from "../../database/customers";
import { useForm } from "react-hook-form";
import { customerSchema } from "../../schemas/customers.schema";
import { ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ICustomer, ICustomerOmitId } from "../../interfaces/customers.interface";
import { notifyCustomerCreate } from "../../notifications/customers";

const Customers = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<ICustomerOmitId>({
        resolver: zodResolver(customerSchema)
    });

    const readCustomers = async () => {
        const customersArr = await getCustomer();
        setCustomers(customersArr);
    }

    const createCustomer = async (formData: ICustomerOmitId) => {
        try {
            const customer = customerSchema.parse(formData);
            const newCustomer = postCustomer(customer.name, customer.contact);
            notifyCustomerCreate(newCustomer);
            readCustomers();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        readCustomers();
    }, [])

    return (
        <main>
            <form onSubmit={handleSubmit(createCustomer)} className={style.form}>
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