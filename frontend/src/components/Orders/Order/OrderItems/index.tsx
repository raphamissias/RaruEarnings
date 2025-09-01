import style from "./style.module.css";
import type { IItem } from "../../../../contexts/orders";

interface IOrderItemProps {
    items: IItem[]
}

interface ITask {
    quantity: number;
    name: string;
    value: number
}

const OrderItem = ({ items }: IOrderItemProps) => {

    const tasks: ITask[] = []

    items.forEach((item) => {
        const existingItem = tasks.find((i) => i.name === item.task.name);

        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.value = existingItem.value + parseFloat(item.task.value);
        } else {
            tasks.push({
                quantity: 1,
                name: item.task.name,
                value: parseFloat(item.task.value)
            })
        }
    });

    return (
        <>
            {tasks.map((task) => (
                <div className={style.item}>
                    <p className="item_quantity">{task.quantity}</p>
                    <p className="task_name">{task.name}</p>
                    <p className="task_value">{task.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
            ))}
        </>
    )
}

export default OrderItem;