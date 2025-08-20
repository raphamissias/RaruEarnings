import style from "./style.module.css";
import OrderItem from "./OrderItems";
import OrderInfo from "./OrderInfo";
import { useState } from "react";

const Order = ({ order }) => {
    const [expanded, setExpanded] = useState(false);

    const totalValue = () => {
        let total = 0

        order.items.map((item) => {
            total += parseFloat(item.task.value);
        })

        return total
    }

    return (
        <>
            {expanded && <div className={style.overlay} onClick={() => setExpanded(false)} />}
            <div onClick={() => setExpanded(true)} className={`${style.order} ${expanded ? style.expanded : ""}`} key={order.id}>
                {expanded ? (
                        <>
                            <OrderInfo lblText="Cliente" input={order.customer.name} />
                            <div className={style.orderItems}>
                                <OrderItem items={order.items}/>
                            </div>
                            <div id={style.specifies}>
                                <OrderInfo lblText="Dentes" input={order.teeths} />
                                <OrderInfo lblText="Cor" input={order.color} />
                                <OrderInfo lblText="Total" value={totalValue()} />
                                <OrderInfo lblText="Data" input={order.date} />
                            </div>
                            <button>Atualizar</button>
                        </>
                    ) : (
                        <>
                            <OrderInfo lblText="Cliente" value={order.customer.name} />
                            <div className={style.orderItems}>
                                <OrderItem items={order.items}/>
                            </div>
                            <div id={style.specifies}>
                                <OrderInfo lblText="Dentes" value={order.teeths} />
                                <OrderInfo lblText="Cor" value={order.color} />
                                <OrderInfo lblText="Total" value={totalValue()} />
                                <OrderInfo lblText="Data" value={order.date} />
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Order;