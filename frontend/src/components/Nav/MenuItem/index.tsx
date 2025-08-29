import style from "./style.module.css";

interface MenuItemProps {
    text: string,
    icon: string
}

const MenuItem = ({ text, icon } : MenuItemProps) => {

    return (
        <div className={style.menuItem}>
            <span className={style.icon}>{ icon }</span>
            <a href="">{ text }</a>
        </div>
    )
}

export default MenuItem;