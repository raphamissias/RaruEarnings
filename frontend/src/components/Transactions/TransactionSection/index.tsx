import style from "./style.module.css"

interface ItransactionSectionProps {
    label: string;
    value: string;
}

const TransactionSection = ({ label, value }: ItransactionSectionProps) => {

    return (
        <div>
            <label htmlFor="">{ label }:</label>
            <p className={ parseFloat(value) > 0 ? style.credit : style.debit }>{ value }</p>                
        </div>
    )
}

export default TransactionSection;