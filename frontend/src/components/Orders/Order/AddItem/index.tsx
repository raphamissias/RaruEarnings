import style from "./style.module.css"

const AddItem = () => {

    return (
        <div className={style.addItem}>
            <div className={style.item}>
                <input type="number" className={style.quantity} placeholder="0"/>
                <select name="" id="" className={style.name}></select>
            </div>
            <button>+</button>
        </div>
    )
};

export default AddItem;