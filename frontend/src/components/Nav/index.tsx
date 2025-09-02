import { useState } from "react";
import style from "./style.module.css";
import MenuItem from "./MenuItem";

const Nav = () => {
    const [openedMenu, setOpenedMenu] = useState(false)

    return (
        <nav>
            <button onClick={() => setOpenedMenu(true)} className={`${style.icon} ${style.button_menu}`}>menu</button>
            {openedMenu && <div onClick={() => setOpenedMenu(false)} className={style.overlay}></div>}
            <div className={`${style.menu} ${openedMenu ? style.open : ""}`}>
                <MenuItem url="/" text="Ordens" icon="order_approve"></MenuItem>
                <MenuItem url="/customers" text="Clientes" icon="person"></MenuItem>
                <MenuItem url="/tasks" text="Trabalhos" icon="dentistry"></MenuItem>
            </div>
        </nav>
    )
}

export default Nav;