import style from "./style.module.css"

interface IHistoryItemProps {
    name: string;
    date: string;
    value: string;
    isDiscount: boolean;
}

const HistoryItem = ({name, date, value, isDiscount}: IHistoryItemProps) => {

    return (
        <li className={style.item}>
            <p className={style.name}>{ name }</p>
            <p className={style.date}>{ "Data: " + date }</p>
            <p className={isDiscount? style.debit : style.value}>{ isDiscount? "-" + value : "+" + value }</p>
        </li>
    )
};

export default HistoryItem;