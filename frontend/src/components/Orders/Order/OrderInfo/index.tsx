import { useEffect, useState } from "react";
import style from "./style.module.css";
import { readCustomer, type ICustomer } from "../../../../database/customers";

interface IOrderInfoProps {
    lblText: string;
    value?: string;
    input?: string;
    icon?: string;
    placeholder?: string;
    select?: string;
}

const OrderInfo = ({lblText, value, input, icon, placeholder, select}: IOrderInfoProps) => {
    const [textField, setTextField] = useState(input);
    const [customers, setCustomers] = useState<ICustomer[]>([]);

    useEffect(() => {
        setTextField(input);
    }, [input])

    const getCustomers = async () => {
        const customersArr = await readCustomer();

        setCustomers(customersArr);
    }

    useEffect(() => {
        getCustomers()
    }, [customers])


    return (
        <div className={style.orderInfo}>
            {icon? <img src={icon} className={style.icon}></img> 
                : <label htmlFor="">{lblText}:</label>
            }
            {input ? 
                <input type="text" value={textField} placeholder={placeholder} onChange={e => setTextField(e.target.value)}/>
            : select ? 
                <select name="" id="">
                    {customers.map(item => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
            : <p>{value}</p> }
        </div>
    )
}

export default OrderInfo;