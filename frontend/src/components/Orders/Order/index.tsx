import style from "./style.module.css";
import OrderItem from "./OrderItems";
import OrderInfo from "./OrderInfo";
import { useState } from "react";
import { group_grayIcon, person_grayIcon, dentistry_grayIcon, palette_grayIcon, date_grayIcon } from "../../../icons";
import type { IOrderOutput } from "../../../interfaces/orders.interface";

interface IOrderProps {
    order: IOrderOutput
}

const Order = ({ order }: IOrderProps) => {
    const [editMode, setEditMode] = useState(false);

    const totalTasksValue = () => {
        let total = 0

        order.items.map((item) => total += parseFloat(item.task.value));

        return total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }

    return (
        <>                
            <li onClick={() => setEditMode(true)} className={`${style.order} ${editMode ? style.editMode : ""}`} key={order.id}>
                {editMode ? (
                        <>
                            <OrderInfo lblText="Cliente" select={order.customer.name} />
                            <OrderInfo lblText="Paciente" input={order.patient} />


                            <div className={style.orderItems}>
                                <OrderItem items={order.items}/>
                            </div>

                            <div id={style.specifies}>
                                <OrderInfo lblText="Dentes" input={order.teeths} />
                                <OrderInfo lblText="Cor" input={order.color} />
                                <OrderInfo lblText="Total" value={totalTasksValue()} />
                                <OrderInfo lblText="Data" input={order.date} />
                            </div>
                            <button>Atualizar</button>
                        </>
                    ) : (
                        <>
                            <OrderInfo lblText="Cliente" value={order.customer.name} icon={ person_grayIcon } />
                            <OrderInfo lblText="Paciente" value={order.patient} icon={ group_grayIcon } />
                            
                            <div className={style.orderItems}>
                                <OrderItem items={order.items}/>
                            </div>

                            <div id={style.specifies}>
                                <div className={style.specifies_secondary}>
                                    <OrderInfo lblText="Dentes" value={order.teeths} icon={ dentistry_grayIcon } />
                                    <OrderInfo lblText="Cor" value={order.color} icon={ palette_grayIcon } />
                                    <OrderInfo lblText="Data" value={order.date} icon={ date_grayIcon } />
                                </div>
                                <OrderInfo lblText="Total" value={totalTasksValue()} />
                            </div>
                        </>
                    )
                }
            </li>
            {editMode && <div className={style.overlay} onClick={() => setEditMode(false)} />}
        </>
    )
}

export default Order;