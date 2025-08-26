import style from "./style.module.css"

interface IOrderInfoProps {
    lblText: string;
    value?: string;
    input?: string;
    icon?: string;
}

const OrderInfo = ({lblText, value, input, icon}: IOrderInfoProps) => {

    return (
        <div>
            {icon? <span className={style.icon}>{icon}</span> 
                : <label htmlFor="">{lblText}:</label>
            }
            {input ? <input type="text" value={input}/> : <p>{value}</p> }
        </div>
    )
}

export default OrderInfo;