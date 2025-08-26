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
            { expanded ? 
                (
                    <div className={`${style.order} ${style.newOrder}`}>
                            <OrderInfo lblText="Cliente" input="a"/>
                            <div className={style.orderItems}>
                                <AddItem />
                            </div>
                            <div id={style.specifies}>
                                <OrderInfo lblText="Dentes" input="a" placeholder="Dentes" />
                                <OrderInfo lblText="Cor" input="a" />
                                <OrderInfo lblText="Data" input="a" />
                            </div>
                            <button>Criar nota</button>
                    </div>
                )
            : null}
        </section>
    )
};

export default Orders;