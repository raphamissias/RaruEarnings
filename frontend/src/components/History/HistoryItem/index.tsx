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
            <div>
                <p className={style.name}>{ name }</p>
            </div>
            <div>
                <p className={style.date}>{ date }</p>
            </div>
            <div>
                <p className={isDiscount? style.debit : style.value}>{ isDiscount? "-" + value : "+" + value }</p>
            </div>
        </li>
    )
};

export default HistoryItem;