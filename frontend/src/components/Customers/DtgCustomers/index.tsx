import type { ICustomer } from "../../../database/customers";
import style from "./style.module.css"

interface IDtgCustomersProps {
    customers: ICustomer[];
}

const DtgCustomers = ({ customers }: IDtgCustomersProps) => {
    return (
        <ul className={style.dtgCustomers}>
            <div className={style.dtgHeader}>
                <span className={style.column1}>ID</span>
                <span className={style.column2}>Nome</span>
            </div>
            {
                customers.map((item) => (
                    <li className={style.dtgLine}>
                        <span className={style.column1}>{ item.id }</span>
                        <span className={style.column2}>{ item.name }</span>
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

export default DtgCustomers;