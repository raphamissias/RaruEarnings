import style from "./style.module.css"

const TransactionSection = ({ label, value }) => {

    return (
        <div>
            <label htmlFor="">{ label }:</label>
            <p className={ parseFloat(value) > 0 ? style.credit : style.debit }>{ value }</p>                
        </div>
    )
}

export default TransactionSection;