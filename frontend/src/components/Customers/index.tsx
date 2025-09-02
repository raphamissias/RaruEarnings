import style from "./style.module.css"
import DtgCustomers from "./DtgCustomers";
import { useEffect, useState } from "react";
import { readCustomer, type ICustomer } from "../../database/customers";

const Customers = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);

    const getCustomers = async () => {
        const customersArr = await readCustomer();
        setCustomers(customersArr)
    }

    useEffect(() => {
        getCustomers();
    }, [customers])

    return (
        <main>
            <form action="" className={style.form}>
                <input type="text" placeholder="Digite o nome do cliente"/>
                <button>Cadastrar cliente</button>
            </form>
            <DtgCustomers customers={customers}/>
        </main>
    )
}

export default Customers;