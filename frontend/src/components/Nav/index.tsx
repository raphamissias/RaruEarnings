import { useState } from "react";
import style from "./style.module.css";
import MenuItem from "./MenuItem";
import menu from "../../icons/menu.svg";
import order from "../../icons/order.svg";
import person from "../../icons/person.svg";
import dentistry from "../../icons/dentistry.svg";

const Nav = () => {
    const [openedMenu, setOpenedMenu] = useState(false)

    return (
        <nav>
            <button onClick={() => setOpenedMenu(true)} className={`${style.icon} ${style.button_menu}`}>
                <img src={menu} alt="menu" className={style.icon}/>
            </button>
            {openedMenu && <div onClick={() => setOpenedMenu(false)} className={style.overlay}></div>}
            <div className={`${style.menu} ${openedMenu ? style.open : ""}`}>
                <MenuItem url="/" text="Ordens" icon={order}></MenuItem>
                <MenuItem url="/customers" text="Clientes" icon={person}></MenuItem>
                <MenuItem url="/tasks" text="Trabalhos" icon={dentistry}></MenuItem>
            </div>
        </nav>
    )
}

export default Nav;