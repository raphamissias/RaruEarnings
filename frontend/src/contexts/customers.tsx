import { createContext, useEffect, useState } from "react";
import { readCustomer } from "../database/customers";
import type { ICustomer } from "../interfaces/customers.interface";

interface ICustomersContext {
    customers: ICustomer[];
}

interface ICustomersProviderProps {
    children: React.ReactNode;
}

export const CustomersContext = createContext({} as ICustomersContext);

export const CustomersProvider = ({ children }: ICustomersProviderProps) => {
    const [customers, setCustomers] = useState<ICustomer[] | []>([]);    

    useEffect(() => {
        const loadCustomers = async () => {
            const customers = await readCustomer();
            setCustomers(customers);
        }

        loadCustomers();
    },[])

    return (
        <CustomersContext.Provider value={ { customers } }>
            { children }
        </CustomersContext.Provider>
    )
}