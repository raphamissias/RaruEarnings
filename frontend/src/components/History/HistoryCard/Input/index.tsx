import type { UseFormRegisterReturn } from "react-hook-form";
import style from "./style.module.css"
import { useState } from "react";

interface IInputProps {
    label: string;
    value?: string | number;
    type?: string;
    checked?: boolean;
    register?: UseFormRegisterReturn<string>;
    error?: boolean;
}

const Input = ({ label, value, type="text", checked=false, register, error }: IInputProps) => {
    const [currentValue, setcurrentValue] = useState(value);
    const [isChecked, setIsChecked] = useState(checked);

    return (
        <div className={style.container}>
            <label htmlFor="">{ label }</label>
            { type == "text" ? 
                <input type="text" value={ currentValue } {...register} onChange={e => setcurrentValue(e.target.value)} className={`${ error ? style.errorInput : null }`} />
                : <input type="checkbox" checked={isChecked} {...register} onChange={() => setIsChecked(!isChecked)} />
            }
        </div>
    )
}

export default Input;