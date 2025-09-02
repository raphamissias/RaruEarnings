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
            <img src={ icon } className={style.icon} alt="" />
            <Link to={ url }>{ text }</Link>
        </div>
    )
}

export default MenuItem;