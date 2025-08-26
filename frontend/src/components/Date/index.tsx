import style from "./style.module.css";
import { DateContext } from "../../contexts/date";
import { useContext } from "react";
import { useForm } from "react-hook-form";

interface IDateFormValues {
    initial: string;
    final: string
}

const Date = () => {
    const { setInitialDate, setFinalDate } = useContext(DateContext);
    
    const { register, handleSubmit } = useForm<IDateFormValues>();

    const submit = (formData: IDateFormValues) => {
        const { initial, final } = formData;

        if (initial != "") {
            setInitialDate(initial);
        }

        if (final != "") {
            setFinalDate(final);
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className={style.date}>
            <label htmlFor="">De</label>
            <input type="date" {...register("initial")} />
            <label htmlFor="">a</label>
            <input type="date" {...register("final")} />
            <button type="submit" className={style.icon}>search</button>
        </form>
    )
};

export default Date;