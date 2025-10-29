import style from "./style.module.css"
import HistoryItem from "./HistoryItem";
import { useContext, useState } from "react";
import { TransactionsContext } from "../../contexts/transactions";
import HistoryCard from "./HistoryCard";

const History = () => {
    const { transactionsList } = useContext(TransactionsContext);
    const [cardMode, setCardMode] = useState<string>("view")

    return (
        <section className={style.history}>
            <h6>Histórico de lançamentos</h6>

            <div className={style.historyContainer}>
                <button className={style.addButton} onClick={() => setCardMode("create")}>+</button>

                <ul className={style.transactionsHistory}>
                    { transactionsList.map((item) => (
                        //Items contains 2 modes: "view" and "update", that appears in card form 
                        <HistoryItem mode={"view"} transaction={item} key={item.id}></HistoryItem>
                    )) }
                </ul>
            </div>

            { cardMode == "create" && 
                //HistoryCard contains 2 mode: "create" and "update", that appears with the HistoryItem values 
                <HistoryCard mode="create" setItemMode={setCardMode}/> 
            }
        </section>        
    )
}

export default History;