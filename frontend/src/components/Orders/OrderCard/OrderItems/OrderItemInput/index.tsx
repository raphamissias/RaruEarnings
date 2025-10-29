import { useContext, useState } from "react";
import style from "./style.module.css"
import type { UseFormRegisterReturn } from "react-hook-form";
import { TasksContext } from "../../../../../contexts/tasks";

interface IOrderItemInputProps {
    taskName?: string;
    register?: UseFormRegisterReturn | undefined;
}

const OrderItemInput = ({ taskName, register }: IOrderItemInputProps) => {
    const [displayTask, setDisplayTask] = useState<string | undefined>(taskName);
    const { tasks } = useContext(TasksContext);

    return (
        <li className={style.item}>
            <input list="tasks" id={style.itemInput} value={displayTask} {...register} onChange={(e) => setDisplayTask(e.target.value)} />
            <datalist id="tasks">
                { tasks.map(task => <option key={task.id}>{task.name}</option>) }
            </datalist>
        </li>
    )
};

export default OrderItemInput;