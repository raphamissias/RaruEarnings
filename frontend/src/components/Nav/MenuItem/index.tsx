import style from "./style.module.css";
import { Link } from "react-router-dom";

interface MenuItemProps {
    text: string,
    icon: string,
    url: string
}

const MenuItem = ({ text, icon, url } : MenuItemProps) => {

    return (
        <div className={style.menuItem}>
            <span className={style.icon}>{ icon }</span>
            <Link to={ url }>{ text }</Link>
        </div>
    )
}

export default MenuItem;