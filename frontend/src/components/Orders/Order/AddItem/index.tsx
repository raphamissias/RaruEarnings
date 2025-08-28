import { useEffect, useState } from "react";
import style from "./style.module.css"
import { readTasks, type ITask } from "../../../../database/tasks";

const AddItem = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    const getTasks = async () => {
        const tasksArr: ITask[] = await readTasks();

        setTasks(tasksArr)
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div className={style.addItem}>
            <div className={style.item}>
                <input type="number" className={style.quantity} placeholder="0" min={1} max={10} defaultValue={1}/>
                <select name="" id="" className={style.name}>
                    {tasks.map(item => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
};

export default AddItem;