import { useState } from "react";
import style from "./style.module.css"

interface IOrderInfoProps {
    lblText: string;
    value?: string;
    input?: string;
    icon?: string;
    placeholder?: string;
}

const OrderInfo = ({lblText, value, input, icon, placeholder}: IOrderInfoProps) => {
    const [textField, setTextField] = useState(input);

    const textUpdate = () => {
        let text = ""

        text += textField;

        return text;
    }

    return (
        <div className={style.orderInfo}>
            {icon? <span className={style.icon}>{icon}</span> 
                : <label htmlFor="">{lblText}:</label>
            }
            {input ? <input type="text" value={textUpdate()} placeholder={placeholder} onClick={() => (setTextField(""))}></input> : <p>{value}</p> }
        </div>
    )
}

export default OrderInfo;