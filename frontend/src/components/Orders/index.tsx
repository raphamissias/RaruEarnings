import { useState } from "react";
import ListOrders from "./ListOrders";
import style from "./style.module.css"
import OrderInfo from "./Order/OrderInfo";
import AddItem from "./Order/AddItem";

const Orders = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className={style.orders}>
            <button className={style.addOrder} onClick={() => setExpanded(!expanded)}>+</button>
            <ListOrders></ListOrders>
            {expanded && <div className={style.overlay} onClick={() => setExpanded(false)} />}
            { expanded ? 
                (
                    <div className={`${style.order} ${style.newOrder}`}>
                            <OrderInfo lblText="Cliente" input=" "/>
                            <div className={style.orderItems}>
                                <AddItem />
                            </div>
                            <div className={style.specifies}>
                                <OrderInfo lblText="Dentes" input=" " />
                                <OrderInfo lblText="Cor" input=" " />
                                <OrderInfo lblText="Data" input=" " />
                            </div>
                            <button>Criar nota</button>
                    </div>
                )
            : null}
        </section>
    )
};

export default Orders;