import type { ITask } from "../../../database/tasks";
import style from "./style.module.css"

interface IDtgTasksProps {
    tasks: ITask[];
}

const DtgTasks = ({ tasks }: IDtgTasksProps) => {
    return (
        <ul className={style.dtgCustomers}>
            <div className={style.dtgHeader}>
                <span className={style.column1}>ID</span>
                <span className={style.column2}>Nome</span>
                <span className={style.column3}>Valor</span>
            </div>
            {
                tasks.map((item) => (
                    <li className={style.dtgLine}>
                        <span className={style.column1}>{ item.id }</span>
                        <span className={style.column2}>{ item.name }</span>
                        <span className={style.column3}>{ item.value }</span>
                        <div className={style.buttons}>
                            <button>atua</button>
                            <button>del</button>
                        </div>
                    </li>

                ))
            }
        </ul>
    )
}

export default DtgTasks;