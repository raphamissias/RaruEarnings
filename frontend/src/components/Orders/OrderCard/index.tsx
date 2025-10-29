import { useContext, useEffect, useState } from "react";
import { group_grayIcon, person_grayIcon, dentistry_grayIcon, palette_grayIcon, date_grayIcon } from "../../../icons";
import type { IOrderFormValues, IOrderOutput } from "../../../interfaces/orders.interface";
import OrderInput from "./OrderInput";
import OrderItems from "./OrderItems";
import style from "./style.module.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import OrderText from "./OrderText";
import { CustomersContext } from "../../../contexts/customers";
import { TasksContext } from "../../../contexts/tasks";
import { patchOrderItem, postOrderItem } from "../../../database/orderItems";
import { OrdersContext } from "../../../contexts/orders";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "../../../schemas/orders.schema";
import { notifyOrderItemCreate, notifyOrderItemUpdate, notifyOrderUpdate } from "../../../notifications/orders";
import { patchOrder } from "../../../database/orders";

interface IOrderCardProps {
    order?: IOrderOutput;
    mode: "view" | "edit" | "create",
    createOrder: SubmitHandler<IOrderFormValues>,
}

const OrderCard = ({ order, mode, createOrder}: IOrderCardProps) => {
    const [cardMode, setCardMode] = useState(mode);
    const { customers } = useContext(CustomersContext);
    const { tasks } = useContext(TasksContext);
    const { refreshOrders, setRefreshOrders } = useContext(OrdersContext);
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IOrderFormValues>({
        resolver: zodResolver(orderSchema)
    });

    const updateOrder = async (formData: IOrderFormValues) => {
        try {
            const orderId = order? order.id : -1;
            const customer = customers.find(customer => customer.name == formData.customer);
            if (customer) {
                formData.customer = customer.id.toString();
            }

            updateOrderItem(formData.items);
            
            const response = patchOrder(orderId, formData);
            notifyOrderUpdate(response);

            const updatedOrder = await response;

            if (updatedOrder.status == 204) {
                reset();
                setCardMode("view");
                setRefreshOrders(!refreshOrders);
            }

            reset();
        } catch (error) {
            console.log(error);
        }
    }

    const updateOrderItem = (items: Record<string, string>) => {
        const originalArray = order?.items;
        const updatedObject = items;
        const orderId = order ? order.id : -1;

        Object.keys(updatedObject).forEach(key => {
            //Create orderItem if doesn't exists in original array
            if (key.includes('a')) {
                const task = tasks.find(task => task.name == updatedObject[key]);
                const taskId = task ? task.id : -1;
                const response = postOrderItem(orderId, taskId);
                notifyOrderItemCreate(response);
            } else {
                //Update orderItem if changed in existent field
                const orderItemId = key.split('-')[1];
                originalArray?.map(item => {
                    if (item.id == parseInt(orderItemId) && item.task.name != updatedObject[key]) {
                        const task = tasks.find(task => task.name == updatedObject[key]);
                        const taskId = task ? task.id : -1;
                        const response = patchOrderItem(Number(item.id), taskId);
                        notifyOrderItemUpdate(response);
                    }
                })
            }
        })

        setRefreshOrders(!refreshOrders);
    }

    const totalTasksValue = () => {
        let total = 0;

        order?.items.map((item) => total += Number(item.task.value));

        return total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    const getCurrentData = () => {
        const currentDate = new Date();
        return new Intl.DateTimeFormat('pt-BR').format(currentDate);
    }

    useEffect(() => {
        reset();
    },[cardMode])

    return (
        <>
            { cardMode == "view" && order ? 
                <div onClick={() => setCardMode("edit")} className={style.orderCard} >
                    <div className={style.specifies}>
                        <OrderText value={order.customer.name} icon={ person_grayIcon } />
                        <OrderText value={order.patient} icon={ group_grayIcon } />
                    </div>

                    <OrderItems mode="view" items={order.items} reset={reset}/>

                    <div className={style.specifies}>
                        <div className={style.specifies_secondary}>
                            <OrderText value={order.teeths} icon={ dentistry_grayIcon } />
                            <OrderText value={order.color} icon={ palette_grayIcon } />
                            <OrderText value={order.date} icon={ date_grayIcon } />
                        </div>
                        <OrderText value={totalTasksValue()} lblText="Total" />
                    </div>
                </div>

                : cardMode == "edit" && order ?  
                    <form onSubmit={handleSubmit(updateOrder)} className={`${style.orderCard} ${style.createEditMode}`} >
                        <button id={style.closeButton} onClick={() => {setCardMode("view"), reset()}}>X</button>
                        <OrderInput lblText="Cliente" value={order.customer.name} register={register("customer")} />
                        {errors.customer ? <p className={style.errorMessage}>{errors.customer.message}</p> : null}
                        <OrderInput lblText="Paciente" value={order.patient} register={register("patient")} />

                        <OrderItems mode="edit" items={order.items} register={register} reset={reset} />

                        <div className={style.specifies}>
                            <OrderInput lblText="Dentes" value={order.teeths} register={register("teeths")} />
                            {errors.teeths ? <p className={style.errorMessage}>{errors.teeths.message}</p> : null}
                            <OrderInput lblText="Cor" value={order.color} register={register("color")} />
                            {errors.color ? <p className={style.errorMessage}>{errors.color.message}</p> : null}                            
                            <OrderInput lblText="Data" value={order.date} register={register("date")} />
                            {errors.date ? <p className={style.errorMessage}>{errors.date.message}</p> : null}
                        </div>
                        
                        <button type="submit" className={style.defaultButton}>Atualizar nota</button>
                    </form>

                : cardMode == "create" ? 
                    <form onSubmit={handleSubmit(createOrder)} className={`${style.orderCard} ${style.createEditMode}`} >
                        <button id={style.closeButton} onClick={() => {setCardMode("view"), reset()}}>X</button>
                        <OrderInput lblText="Cliente" selectCustomer=" " register={register("customer")} error={errors.customer ? true : false} />
                        {errors.customer ? <p className={style.errorMessage}>{errors.customer.message}</p> : null}
                        <OrderInput lblText="Paciente" register={register("patient")} error={errors.patient ? true : false} />           
                        
                        <OrderItems mode="create" register={register} reset={reset}/>

                        <div className={style.specifies}>
                            <OrderInput lblText="Dentes" register={register("teeths")} error={errors.teeths ? true : false} />
                                {errors.teeths ? <p className={style.errorMessage}>{errors.teeths.message}</p> : null}
                            <OrderInput lblText="Cor" register={register("color")} error={errors.color ? true : false} />
                                {errors.color ? <p className={style.errorMessage}>{errors.color.message}</p> : null}
                            <OrderInput lblText="Data" value={getCurrentData()} register={register("date")} error={errors.date ? true : false} />
                                {errors.date ? <p className={style.errorMessage}>{errors.date.message}</p> : null}
                        </div>

                        <button type="submit" className={style.defaultButton} >Criar nota</button>
                    </form>
                : null
            } 
            {cardMode == "edit" && <div className={style.overlay} onClick={() => {setCardMode("view"), reset()}} />}
        </>
    )
}

export default OrderCard;