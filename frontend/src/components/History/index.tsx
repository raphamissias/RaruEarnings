import style from "./style.module.css"
import HistoryItem from "./HistoryItem";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/transactions";

const History = () => {
    const { transactionsList } = useContext(TransactionsContext);

    return (
        <section className={style.history}>
            <h5>Histórico de lançamentos</h5>
            <ul className={style.transactionsHistory}>
                {transactionsList.map((item) => {
                    return (
                        <HistoryItem name={item.name} date={item.date} value={item.value} isDiscount={item.isDiscount}></HistoryItem>
                    )
                })}
            </ul>
        </section>        
    )
}

export default History;