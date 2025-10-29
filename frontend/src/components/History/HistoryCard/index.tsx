import { useForm } from "react-hook-form";
import Input from "./Input";
import style from "./style.module.css"
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionFormSchema } from "../../../schemas/transactions.schema";
import type { ITransaction, ITransactionFormValues } from "../../../interfaces/transactions.interface";
import { patchTransaction, postTransaction } from "../../../database/transactions";
import { useContext } from "react";
import { TransactionsContext } from "../../../contexts/transactions";
import { notifyTransactionCreate, notifyTransactionUpdate } from "../../../notifications/transactions";

interface IHistoryCardProps {
    mode: "create" | "update";
    transaction?: ITransaction;
    setItemMode: React.Dispatch<React.SetStateAction<string>>;
}

const HistoryCard = ({ mode, transaction, setItemMode}: IHistoryCardProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ITransactionFormValues>({
        resolver: zodResolver(transactionFormSchema)
    });
    const {refreshTransactions, setRefreshTransactions} = useContext(TransactionsContext);

    const createTransaction = async (formData: ITransactionFormValues) => {
        try {
            const { name, value, isDiscount, date } = formData;
            const response = postTransaction(name, value, isDiscount, date);
            notifyTransactionCreate(response);
            const newTransaction = await response;

            if (newTransaction.status == 201) {
                setRefreshTransactions(!refreshTransactions);
                setItemMode("view");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateTransaction = async (formData: ITransactionFormValues) => {
        try {
            const transactionId = transaction ? transaction.id : -1;
            const { name, value, isDiscount, date } = formData;
            
            const response = patchTransaction(transactionId, name, value, isDiscount, date);
            notifyTransactionUpdate(response);
            const newTransaction = await response;
    
            if (newTransaction.status == 204) {
                setRefreshTransactions(!refreshTransactions);
                setItemMode("view");
            }
    
        } catch (error) {
            console.log(error);
        }    
    }

    const getCurrentData = () => {
        const currentDate = new Date();
        return new Intl.DateTimeFormat('pt-BR').format(currentDate);
    }

    return (
        <>
        { mode == "create" ?
                <>
                    <div className={`${style.modal} ${style.transactionCard}`}>

                        <button id={style.closeButton} onClick={() => setItemMode("view")}>X</button>
                        <form onSubmit={handleSubmit(createTransaction)} >
                            <Input label="Nome:" register={register("name")} ></Input>
                            <Input label="Valor:" register={register("value")} error={errors.value? true : false} ></Input>
                            { errors.value ? <p className={style.errorMessage} >{ errors.value.message?.toString() }</p> : null}
                            <Input label="É débito? :" type="checkbox" register={register("isDiscount")} ></Input>
                            <Input label="Data:" value={getCurrentData()} register={register("date")} error={errors.date? true : false} ></Input>
                            { errors.date ? <p className={style.errorMessage} >{ errors.date.message }</p> : null}
                            <button type="submit">Adicionar lançamento</button>
                        </form>

                    </div>
                    <div onClick={() => setItemMode("view")} className={style.overlay}></div>
                </>

            : mode == "update" && transaction ? 
                <>
                    <div className={`${style.modal} ${style.transactionCard}`}>

                        <button id={style.closeButton} onClick={() => setItemMode("view")}>X</button>
                        <form onSubmit={handleSubmit(updateTransaction)} >
                            <Input label="Nome:" value={transaction.name} register={register("name")} ></Input>
                            <Input label="Valor:" value={transaction.value} register={register("value")} error={errors.value? true : false} ></Input>
                            { errors.value ? <p className={style.errorMessage} >{ errors.value.message?.toString() }</p> : null}
                            <Input label="É débito? :" type="checkbox" checked={transaction.isDiscount} register={register("isDiscount")} ></Input>
                            <Input label="Data:" value={transaction.date} register={register("date")} error={errors.date? true : false} ></Input>
                            { errors.date ? <p className={style.errorMessage} >{ errors.date.message }</p> : null}
                            <button type="submit">Atualizar lançamento</button>
                        </form>

                    </div>
                    <div onClick={() => setItemMode("view")} className={style.overlay}></div>
                </>
            : null
        }
        </>
    )
}

export default HistoryCard;