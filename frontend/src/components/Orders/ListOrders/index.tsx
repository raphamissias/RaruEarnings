import style from "./style.module.css";
import { useContext } from "react";
import Order from "../Order";
import { OrdersContext } from "../../../contexts/orders";

const ListOrders = () => {

    const { ordersList } = useContext(OrdersContext)

    return (
        <ul className={style.listOrders}>
            {ordersList ? ordersList.map((item) => (
                <Order order={item} key={item.id}/>
            )) : null}
        </ul>
    )
}

export default ListOrders;