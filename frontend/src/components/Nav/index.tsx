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
                <MenuItem text="Ordens" icon="order_approve"></MenuItem>
                <MenuItem text="Clientes" icon="person"></MenuItem>
                <MenuItem text="Trabalhos" icon="dentistry"></MenuItem>
            </div>
        </nav>
    )
}

export default Nav;