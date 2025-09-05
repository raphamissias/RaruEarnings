import { deleteTask, readTasks, updateTask } from "../../../database/tasks";
import style from "./style.module.css";
import { deleteIcon, editIcon, saveIcon, closeIcon, } from "../../../icons";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../../schemas/tasks.schema";
import type { ITaskFormValues, ITaskOutput } from "../../../interfaces/tasks.interface";
import { useForm } from "react-hook-form";
import type { AxiosError, AxiosResponse } from "axios";

interface IDtgTasksProps {
    tasks: ITaskOutput[];
}

const DtgTasks = ({ tasks }: IDtgTasksProps) => {
    const [editMode, setEditMode] = useState(false);
    const [currentTaskEdit, setCurrentTaskEdit] = useState(0);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ITaskFormValues>({
        resolver: zodResolver(taskSchema)
    });
    
    const taskUpdate = async (id: number, formData: ITaskFormValues) => {
        try {
            console.log(formData)
            const taskValues = taskSchema.parse(formData);
            const newTask = updateTask(id, taskValues);
            updateNotify(newTask)
            
            readTasks();
            reset();
            closeEditMode();
        } catch (error) {
            console.log(error)
        }
    }

    const taskDelete = async (id: number) => {
        try {
            console.log(id)
            const deletedTask = deleteTask(id);
            deleteNotify(deletedTask);

            readTasks();
        } catch (error) {
            console.log(error)
            toast.error("Erro ao deletar tarefa")
        }
    }

    const openEditMode = (id: number) => {
        setCurrentTaskEdit(id);
        setEditMode(true);
    }

    const closeEditMode = () => {
        setCurrentTaskEdit(0);
        setEditMode(false);
    }

    const deleteNotify = (taskDeleteReturn: Promise<AxiosResponse<ITaskOutput | AxiosError>>) => {
        return toast.promise(taskDeleteReturn, {
            pending: 'Deletando tarefa',
            success: 'Tarefa deletada com sucesso!',
        }, { theme: "dark" });
    }

    const updateNotify = (submitReturn: Promise<AxiosResponse<ITaskOutput | AxiosError>>) => {
        return toast.promise(submitReturn, {
            pending: 'Atualizando tarefa',
            success: 'Tarefa atualizada com sucesso!',
            error: {
                render({ data }) {
                    const error = data as AxiosError<{ message?: string }>;
                    return error.response?.data?.message || "Erro ao atualizar tarefa";
                }
            }
        }, { theme: "dark", closeOnClick: true});
    }

    return (
        <ul className={style.dtgTasks}>
            <div className={style.dtgHeader}>
                <span className={style.column1}>ID</span>
                <span className={style.column2}>Nome</span>
                <span className={style.column3}>Valor</span>
            </div>

            {
                tasks.map((item) => (
                    <li className={style.dtgLine} key={item.id}>
                        <span className={style.column1}>{ item.id }</span>

                        {editMode && item.id === currentTaskEdit ? (
                            <form onSubmit={handleSubmit((formData) => taskUpdate(item.id, formData))} className={style.formColumn}>
                                <input type="text" placeholder={item.name} className={`${style.column2} ${errors.name ? style.error : ""}`} {...register("name")} />
                                <input type="number" step=".01" placeholder={item.value.toString()} className={`${style.column3} ${errors.value ? `${style.valueInput} ${style.error}` : `${style.valueInput}`}` } {...register("value")} />
                                <button type="submit"><img src={saveIcon} alt="" /></button>
                            </form>
                        ) : (
                            <>
                                <span className={style.column2}>{item.name}</span>
                                <span className={style.column3}>{item.value}</span>
                            </>
                        )}

                        <div className={style.buttons}>
                            { editMode && item.id == currentTaskEdit 
                                ? <button onClick={() => closeEditMode()}><img src={ closeIcon } alt="cancel" /></button>
                                : <button onClick={() => openEditMode(item.id)}><img src={ editIcon } alt="edit" /></button> 
                            }

                            <button onClick={() => {setDeleteDialog(true), setCurrentTaskEdit(item.id)}}>
                                <img src={ deleteIcon } alt="delete" />
                            </button>
                        </div>

                        
                        {deleteDialog && currentTaskEdit == item.id &&
                            <>
                                <div className={style.overlay} onClick={() => setDeleteDialog(false)}></div>

                                <div className={style.deleteDialog}>
                                    <button className={style.deleteDialogCancel} onClick={() => setDeleteDialog(false)}>
                                        <img src={closeIcon} alt="" />
                                    </button>
                                    <p className={style.deleteDialogTitle}>Deseja realmente apagar?</p>
                                    <p>{item.name}</p>
                                    <button onClick={() => taskDelete(item.id)} className={style.deleteDialogButton}>Apagar tarefa</button>
                                </div>
                            </>
                        }
                    </li>
                ))
            }
            <ToastContainer />
        </ul>
    )
}

export default DtgTasks;