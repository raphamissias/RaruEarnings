import { deleteCustomer, readCustomer, updateCustomer } from "../../../database/customers";
import style from "./style.module.css"
import { deleteIcon, editIcon, saveIcon, closeIcon, } from "../../../icons";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { customerSchema } from "../../../schemas/customers.schema";
import { toast } from "react-toastify";
import type { AxiosError, AxiosResponse } from "axios";
import type { ICustomer, ICustomerOmitId } from "../../../interfaces/customers.interface";

interface IDtgCustomersProps {
    customers: ICustomer[];
}

const DtgCustomers = ({ customers }: IDtgCustomersProps) => {
    const [editMode, setEditMode] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(0);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ICustomerOmitId>({
        resolver: zodResolver(customerSchema)
    });

    const customerUpdate = async (id: number, formData: ICustomerOmitId) => {
        try {
            const customerValues = customerSchema.parse(formData);
            const newCustomer = updateCustomer(id, customerValues);
            updateNotify(newCustomer)
            
            readCustomer();
            reset();
            closeEditMode();
        } catch (error) {
            console.log(error)
        }
    }

    const customerDelete = async (id: number) => {
        try {
            const deletedCustomer = deleteCustomer(id);
            deleteNotify(deletedCustomer);

            readCustomer();
        } catch (error) {
            console.log(error)
            toast.error("Erro ao deletar cliente")
        }
    }

    const openEditMode = (id: number) => {
        setCurrentCustomer(id);
        setEditMode(true);
    }

    const closeEditMode = () => {
        setCurrentCustomer(0);
        setEditMode(false);
    }

    const deleteNotify = (customerDeleteReturn: Promise<AxiosResponse<ICustomer | AxiosError>>) => {
        return toast.promise(customerDeleteReturn, {
            pending: 'Deletando cliente',
            success: 'Cliente deletado com sucesso!',
        }, { theme: "dark" });
    }

    const updateNotify = (submitReturn: Promise<AxiosResponse<ICustomer | AxiosError>>) => {
        return toast.promise(submitReturn, {
            pending: 'Atualizando cliente',
            success: 'Cliente atualizado com sucesso!',
            error: {
                render({ data }) {
                    const error = data as AxiosError<{ message?: string }>;
                    return error.response?.data?.message || "Erro ao atualizar cliente";
                }
            }
        }, { theme: "dark", closeOnClick: true});
    }

    return (
        <ul className={style.dtgCustomers}>
            <div className={style.dtgHeader}>
                <span className={style.column1}>ID</span>
                <span className={style.column2}>Nome</span>
            </div>
            {
                customers.map((item) => (
                    <li className={style.dtgLine} key={item.id}>
                        <span className={style.column1}>{ item.id }</span>

                        {editMode && item.id === currentCustomer ? (
                            <form onSubmit={handleSubmit((formData) => customerUpdate(item.id, formData))} className={style.formColumn}>
                                <input type="text" placeholder={item.name} className={errors.name ? style.error : ""} {...register("name")} />
                                <button type="submit"><img src={saveIcon} alt="" /></button>
                            </form>
                        ) : (
                            <>
                                <span className={style.column2}>{item.name}</span>
                            </>
                        )}

                        <div className={style.buttons}>
                            { editMode && item.id == currentCustomer 
                                ? <button onClick={() => closeEditMode()}><img src={ closeIcon } alt="cancel" /></button>
                                : <button onClick={() => openEditMode(item.id)}><img src={ editIcon } alt="edit" /></button> 
                            }

                            <button onClick={() => {setDeleteDialog(true), setCurrentCustomer(item.id)}}>
                                <img src={ deleteIcon } alt="delete" />
                            </button>
                        </div>

                        
                        {deleteDialog && currentCustomer == item.id &&
                            <>
                                <div className={style.overlay} onClick={() => setDeleteDialog(false)}></div>

                                <div className={style.deleteDialog}>
                                    <button className={style.deleteDialogCancel} onClick={() => setDeleteDialog(false)}>
                                        <img src={closeIcon} alt="" />
                                    </button>
                                    <p className={style.deleteDialogTitle}>Deseja realmente apagar?</p>
                                    <p>{item.name}</p>
                                    <button onClick={() => customerDelete(item.id)} className={style.deleteDialogButton}>Apagar cliente</button>
                                </div>
                            </>
                        }
                    </li>
                ))
            }
        </ul>
    )
}

export default DtgCustomers;