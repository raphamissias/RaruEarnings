const OrderInfo = ({lblText, value, input}) => {

    return (
        <div>
            <label htmlFor="">{lblText}:</label>
            {input ? <input type="text" value={input}/> : <p>{value}</p> }
        </div>
    )
}

export default OrderInfo;