import style from "./style.module.css";
import { useContext, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { CustomersContext } from "../../../../contexts/customers";

interface IOrderInputProps {
    lblText?: string;
    value?: string | number| undefined;
    icon?: string;
    placeholder?: string;
    selectCustomer?: string;
    register?: UseFormRegisterReturn<string>;
    error?: boolean;
}

const OrderInput = ({icon, lblText, value, selectCustomer, register, error}: IOrderInputProps) => {
    const [textField, setTextField] = useState(value);
    const [customerField, setCustomerField] = useState(selectCustomer);

    const { customers } = useContext(CustomersContext);

    return (
        // Editable infos about Order
        <div className={style.orderInfo}>
            {icon? <img src={icon} className={style.icon}></img> 
                : <label htmlFor="">{lblText}:</label>
            }
       
            { selectCustomer ?
                <>
                    <input list="customers" {...register} value={customerField} onChange={(e) => setCustomerField(e.target.value)} onClick={() => setCustomerField("")} className={`${error ? style.errorInput : null}`} />

                    <datalist id="customers">
                        { customers.map(item => <option key={item.id}>{ item.name }</option>) }
                    </datalist>
                </>
            :  value ? 
                <input {...register} value={textField} onChange={(e) => setTextField(e.target.value)} className={`${error ? style.errorInput : null}`} />
            : <input {...register} placeholder="Não informado" onChange={(e) => setTextField(e.target.value)} className={`${error ? style.errorInput : null}`} />
            }
        </div>
    )
}

export default OrderInput;