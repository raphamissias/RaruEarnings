interface IOrderInfoProps {
    lblText: string;
    value?: string;
    input?: string;
}

const OrderInfo = ({lblText, value, input}: IOrderInfoProps) => {

    return (
        <div>
            <label htmlFor="">{lblText}:</label>
            {input ? <input type="text" value={input}/> : <p>{value}</p> }
        </div>
    )
}

export default OrderInfo;