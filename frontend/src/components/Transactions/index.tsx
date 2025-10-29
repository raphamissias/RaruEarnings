import { useContext } from "react";
import style from "./style.module.css";
import TransactionLayer from "./TransactionLayer";
import { OrdersContext } from "../../contexts/orders";
import { TransactionsContext } from "../../contexts/transactions";

const Transactions = () => {
    const { ordersList } = useContext(OrdersContext);
    const { transactionsList } = useContext(TransactionsContext);

    const totalWork = () => {
        let totalValue = 0;

        ordersList ? ordersList.map((order) => {
            order.items.forEach((item) => {
                totalValue += Number(item.task.value)
            });
        }): null;

        return totalValue;
    };

    const totalReceived = () => {
        let total = 0;

        transactionsList ? transactionsList.map((item) => {
            if (item.isDiscount == false) {
                total += parseFloat(item.value);
            }
        }) : null;

        return total.toString();
    };

    const totalSalary = () => {
        let totalReceived = 0;
        let totalDiscount = 0;

        transactionsList ? transactionsList.map((item) => {
            if (item.isDiscount == false) {
                totalReceived += parseFloat(item.value);
            } else {
                // const value = item.value.replace(",", ".");
                totalDiscount += parseFloat(item.value);
            }
        }): null;

        const total = totalReceived - totalDiscount

        return total.toString().substring(0,6);
    }

    const debitToReceive = () => {
        const totalOrdersValue = totalWork();
        const salary = totalSalary()

        const total = totalOrdersValue - parseFloat(salary);

        return total.toString().substring(0,7);
    }

    return (
        <section className={style.transactions}>
            <div className={style.transactionsValues}>
                <TransactionLayer label="Total de Trabalhos" value={totalWork() ? totalWork().toString() : "0"} />
                <TransactionLayer label="Salário" value={totalSalary()} />
                <TransactionLayer label="Valor recebido" value={totalReceived()} />
                <TransactionLayer label="Débito/A receber" value={debitToReceive().toString()} />
            </div>
        </section>
    )
}

export default Transactions;