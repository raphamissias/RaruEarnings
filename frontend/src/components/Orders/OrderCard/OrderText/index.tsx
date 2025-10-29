import style from "./style.module.css";

interface IOrderTextProps {
    value: string | undefined;
    icon?: string;
    lblText?: string;
}

const OrderText = ({value, icon, lblText}: IOrderTextProps) => {
    return (
        <div className={style.orderInfo}>
            {icon? <img src={icon} className={style.icon}></img> 
                : <label htmlFor="">{lblText}:</label>
            }
            <p>{value}</p>
        </div>
    )
}

export default OrderText;