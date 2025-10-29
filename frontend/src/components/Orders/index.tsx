import { useContext, useState } from "react";
import style from "./style.module.css"
import type { IOrderFormValues } from "../../interfaces/orders.interface";
import OrderCard from "./OrderCard";
import { OrdersContext } from "../../contexts/orders";
import { postOrder } from "../../database/orders";
import { ToastContainer } from "react-toastify";
import { postOrderItem } from "../../database/orderItems";
import { TasksContext } from "../../contexts/tasks";
import { CustomersContext } from "../../contexts/customers";
import { notifyOrderCreate, notifyOrderItemCreate } from "../../notifications/orders";

const Orders = () => {
    const [createMode, setCreateMode] = useState(false);
    const { customers } = useContext(CustomersContext);
    const { tasks } = useContext(TasksContext);
    const { refreshOrders, setRefreshOrders } = useContext(OrdersContext); 
    const { ordersList } = useContext(OrdersContext);

    //Receive data from OrderCard
    const createOrder = async (formData: IOrderFormValues) => {
        try {
            const customer = customers.find(customer => customer.name == formData.customer);
            if (customer) {
                formData.customer = customer.id.toString();
            }

            const response = postOrder(formData);
            notifyOrderCreate(response);
            
            const newOrder = await response;

            if (newOrder.status == 201) {
                if (formData.items) {
                    createOrderItem(newOrder.data.order[0], formData.items);
                }

                setCreateMode(false);
                setRefreshOrders(!refreshOrders);
            }            
        } catch (error) {
            console.log(error);
        }
    }

    const createOrderItem = (orderId: number, formTasks: Record<string, string>) => {
        try {            
            Object.values(formTasks).forEach(value => {
                const foundedTask = tasks.find(task => task.name == value);

                if (foundedTask) {
                    const response = postOrderItem(orderId, foundedTask.id);
                    notifyOrderItemCreate(response);
                } else {
                    throw new Error("Tarefa não encontrada");
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <section className={style.orders}>
            <button className={style.addOrderButton} onClick={() => {setCreateMode(true)}}>+</button>
            { createMode && <OrderCard mode="create" createOrder={createOrder} />}

            <ul className={style.listOrders}>
                {ordersList ? ordersList.map(item => 
                    <OrderCard order={item} mode="view" key={item.id} createOrder={createOrder} />
                ) : null}
            </ul>

            {createMode && <div className={style.overlay} onClick={() => setCreateMode(false)} />}
            <ToastContainer />
        </section>
    )
};

export default Orders;