import { useContext } from "react";
import style from "./style.module.css";
import TransactionSection from "./TransactionSection";
import { OrdersContext } from "../../contexts/orders";

const Transactions = () => {

    const { ordersList } = useContext(OrdersContext);

    const totalWork = () => {
        let totalValue = 0;

        ordersList ? ordersList.map((order) => {
            order.items.forEach((item) => {
                totalValue += parseFloat(item.task.value)
            });
        }): null;

        return totalValue;
    }

    return (
        <section className={style.transactions}>
            <div className={style.transactionsValues}>
                <TransactionSection label="Total de Trabalhos" value={totalWork() ? totalWork().toString() : "0"} />
                <TransactionSection label="Salário" value={"581,03"} />
                <TransactionSection label="Valor recebido" value={"800,00"} />
                <TransactionSection label="Débito/A receber" value={"-18,60"} />
            </div>
        </section>
    )
}

export default Transactions;