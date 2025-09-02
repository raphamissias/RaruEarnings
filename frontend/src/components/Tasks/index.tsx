import style from "./style.module.css"
import DtgTasks from "./DtgTasks";
import { useEffect, useState } from "react";
import { readTasks, type ITask } from "../../database/tasks";

const Tasks = () => {
    const [customers, setTasks] = useState<ITask[]>([]);

    const getTasks = async () => {
        const customersArr = await readTasks();
        setTasks(customersArr)
    }

    useEffect(() => {
        getTasks();
    }, [customers])

    return (
        <main>
            <form action="" className={style.form}>
                <input type="text" placeholder="Digite o nome da trabalho"/>
                <button>Cadastrar trabalho</button>
            </form>
            <DtgTasks tasks={customers}/>
        </main>
    )
}

export default Tasks;