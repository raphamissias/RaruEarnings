import style from "./style.module.css"

interface ItransactionLayerProps {
    label: string;
    value: string;
}

const TransactionLayer = ({ label, value }: ItransactionLayerProps) => {

    return (
        <div>
            <label htmlFor="">{ label }:</label>
            <p className={ parseFloat(value) > 0 ? style.credit : style.debit }>{ parseFloat(value).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }) }</p>                
        </div>
    )
}

export default TransactionLayer;