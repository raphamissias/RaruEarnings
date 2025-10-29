import type { IOrderItemOutput } from "../../../../interfaces/orderItems.interface";
import style from "./style.module.css";
import { deleteIcon, checkIcon } from "../../../../icons";
import OrderItemInput from "./OrderItemInput";
import { type UseFormRegister, type UseFormReset } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import type { IOrderFormValues } from "../../../../interfaces/orders.interface";
import { deleteOrderItem } from "../../../../database/orderItems";
import { toast } from "react-toastify";
import { OrdersContext } from "../../../../contexts/orders";
import { notifyOrderItemDelete } from "../../../../notifications/orderItems";

interface IOrderItemProps {
    items?: IOrderItemOutput[];
    register?: UseFormRegister<IOrderFormValues>;
    reset: UseFormReset<IOrderFormValues>
    mode: "view" | "edit" | "create";}

interface ITasksSum {
    quantity: number;
    name: string;
    value: number;
}

const OrderItems = ({ items, mode, register, reset }: IOrderItemProps) => {
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | string | null>(null)
    const {refreshOrders, setRefreshOrders} = useContext(OrdersContext);
    //Armazena os itens da ordem se houver, armazenará também itens recém adicionados
    //que servirão para criação por meio da requisição
    const [updatedItems, setUpdatedItems] = useState<IOrderItemOutput[]>(items && items.length > 0 ? items : [{id: 'a0', task: {id: 0, name: '', value: 0}}]);

    const deleteButtonHandler = (index: number | string) => {
        if (updatedItems.length > 1) {
            confirmDeleteIndex == null ? setConfirmDeleteIndex(index) : setConfirmDeleteIndex(null);
        }
    }

    const confirmDeleteHandler = async (orderItemId: string | number) => {
        try {
            //If the id is generic, only remove from temporary list, else, the order item is deleted 
            if (typeof orderItemId === "string" && orderItemId.includes('a')) {
                setUpdatedItems(updatedItems.filter((item) => item.id != orderItemId));
                reset();
            } else if (typeof orderItemId === "number") {
                const response = deleteOrderItem(orderItemId);
                notifyOrderItemDelete(response);

                setRefreshOrders(!refreshOrders);
                setUpdatedItems(updatedItems.filter((item) => item.id != orderItemId));
                setConfirmDeleteIndex(null);
                reset(/*{ items: updatedItems.filter(item => item.id == orderItemId) }*/);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addButtonHandler = () => {
        if (updatedItems.length <= 7) {
            const ids = updatedItems.map(item => item.id);
            const lastId = ids[ids.length - 1].toString();
            if (lastId.includes('a')) {
                const formatedId = parseInt(lastId.slice(1));
                const temporaryId = `a${formatedId + 1}`;
                setUpdatedItems([...updatedItems, {id: temporaryId, task: {id: 0, name: '', value: 0}}])
            } else {

            }
        }
    }

    //View mode only: Sum tasks to simplified overview
    const mergeTasks = () => {
        const tasks: ITasksSum[] = []

        updatedItems.forEach((item) => {
            const existingItem = tasks.find((i) => i.name === item.task.name);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.value = existingItem.value + item.task.value;
            } else {
                tasks.push({
                    quantity: 1,
                    name: item.task.name,
                    value: item.task.value
                })
            }
        });

        return tasks;
    }

    const mergedTasks = mergeTasks();

    return (
        <>
        { mode == "view" ? 
            <div className={style.itemContainer}>
                { mergedTasks.map((task) => (
                    <div className={style.orderItem} key={task.name}>
                        <p className="item_quantity">{task.quantity}</p>
                        <p className="task_name">{task.name}</p>
                        <p className="task_value">{task.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                ))}
            </div>

            : mode == "edit" ? 
                <div className={style.itemContainer}>
                    {updatedItems.map((item, index) => (
                        <div className={style.orderItem} key={index}>
                            {/*The index + id in items register is to avoid blank items caused by numbers*/}
                            <OrderItemInput key={item.id} taskName={item.task.name} register={register ? register(`items.${index}-${item.id}` as any): undefined} />
                            
                            { confirmDeleteIndex === index && <button type="button" value={item.id} onClick={(e) => confirmDeleteHandler(e.currentTarget.value)} id={style.deleteButton} className={style.confirm}> <img src={checkIcon} className={style.icon} alt="confirm" /> </button> }
                            
                            <button type="button" onClick={() => deleteButtonHandler(index)} id={style.deleteButton} className={ confirmDeleteIndex == index ? style.cancel : style.defaultButton}> <img src={deleteIcon} className={style.icon} alt="delete" /> </button>
                        </div>
                    ))}
                    
                    <button id={style.addButton} type="button" onClick={() => addButtonHandler() }>+</button>
                </div>

            : mode == "create" && 
                <div className={style.itemContainer}>
                    { updatedItems.map((item, index) => (
                        <div className={style.orderItem} key={item.id}>
                            <OrderItemInput key={item.id} register={register ? register(`items.${index}-${item.id}` as any): undefined} />
                            
                            { confirmDeleteIndex === item.id && <button /*value={item}*/ onClick={() => confirmDeleteHandler(item.id)} id={style.deleteButton} className={style.confirm}> <img src={checkIcon} className={style.icon} alt="confirm" /> </button> }
                            <button type="button" onClick={() => deleteButtonHandler(item.id)} id={style.deleteButton} className={ confirmDeleteIndex == item.id ? style.cancel : style.defaultButton}> <img src={deleteIcon} className={style.icon} alt="delete" /> </button>
                        </div>
                    ))}
                    <button id={style.addButton} type="button" onClick={() => addButtonHandler() }>+</button>
                </div>
        }
        </>
    )
}

export default OrderItems;