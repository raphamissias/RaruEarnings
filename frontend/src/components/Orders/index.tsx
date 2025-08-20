import ListOrders from "./ListOrders";
import style from "./style.module.css"
const Orders = () => {

    return (
        <section className={style.orders}>
            <button className={style.addOrder}>+</button>
            <ListOrders></ListOrders>
        </section>
    )
};

export default Orders;