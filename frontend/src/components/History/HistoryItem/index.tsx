import { useState } from "react";
import HistoryCard from "../HistoryCard";
import style from "./style.module.css"
import type { ITransaction } from "../../../interfaces/transactions.interface";

interface IHistoryItemProps {
    mode: "view" | "create" | "update";
    transaction: ITransaction;
    setTransactionModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HistoryItem = ({mode, transaction}: IHistoryItemProps) => {
    const [ itemMode, setItemMode ] = useState<string>(mode);

    return (
        <>
            {
                itemMode == "view" ? 
                <li className={style.item} onClick={() => setItemMode("update")}>
                    <div>
                        <p className={style.name}>{ transaction.name }</p>
                    </div>
                    <div>
                        <p className={style.date}>{ transaction.date }</p>
                    </div>
                    <div>
                        <p className={transaction.isDiscount? style.debit : style.value}>{ transaction.isDiscount? "-" + transaction.value : "+" + transaction.value }</p>
                    </div>
                </li>
                : itemMode == "update" ? 
                    <HistoryCard transaction={transaction} mode="update" setItemMode={setItemMode} />
                : null
            }
        </>
    )
};

export default HistoryItem;