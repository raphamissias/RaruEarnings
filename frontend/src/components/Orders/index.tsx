import { useEffect, useState } from "react";
import ListOrders from "./ListOrders";
import style from "./style.module.css"
import OrderInfo from "./Order/OrderInfo";
import AddItem from "./Order/AddItem";

const Orders = () => {
    const [expanded, setExpanded] = useState(false);
    const [itemCount, setItemCount] = useState(0);

    const addNewItem = () => {
        const renderingArr = [];
        let count = 0;

        while(count < itemCount){
            renderingArr.push(<AddItem />)
            count++
        }

        return (renderingArr);
    }
    
    useEffect(() => {
        addNewItem();
    }, [itemCount])

    return (
        <section className={style.orders}>
            <button className={style.addOrder} onClick={() => {setExpanded(true), setItemCount(0)}}>+</button>
            <ListOrders></ListOrders>
            {expanded && <div className={style.overlay} onClick={() => setExpanded(false)} />}
            { expanded ? 
                (
                    <div className={`${style.order} ${style.newOrder}`}>
                            <OrderInfo lblText="Cliente" select=" " />
                            <OrderInfo lblText="Paciente" input=" " />
                            <div className={style.orderItems}>
                                <AddItem></AddItem>
                                {addNewItem()}
                                <button onClick={() => setItemCount(itemCount + 1)}>+</button>
                            </div>
                            <div className={style.specifies}>
                                <OrderInfo lblText="Dentes" input=" " />
                                <OrderInfo lblText="Cor" input=" " />
                                <OrderInfo lblText="Data" input={new Date().toISOString().substring(0, 10)} />
                            </div>
                            <button>Criar nota</button>
                    </div>
                )
            : null}
        </section>
    )
};

export default Orders;