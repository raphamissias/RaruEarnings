import style from "./style.module.css"
import DtgTasks from "./DtgTasks";
import { useEffect, useState } from "react";
import { createTask, readTasks } from "../../database/tasks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../schemas/tasks.schema";
import type { ITask, ITaskFormValues, ITaskOutput } from "../../interfaces/tasks.interface";
import { toast, ToastContainer } from "react-toastify";
import type { AxiosError, AxiosResponse } from "axios";

const Tasks = () => {
    const [tasks, setTasks] = useState<ITaskOutput[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<ITaskFormValues>({
        resolver: zodResolver(taskSchema)
    });

    const getTasks = async () => {
        const tasksArr = await readTasks();
        setTasks(tasksArr);
    }

    const submit = async (formData: ITaskFormValues) => {
        try {
            const taskValues = taskSchema.parse(formData);
            const newTask = createTask(taskValues);
            registerNotify(newTask)
            getTasks();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTasks();
    }, [tasks])

    const registerNotify = (submitReturn: Promise<AxiosResponse<ITask | AxiosError>>) => {
        return toast.promise(submitReturn, {
            pending: 'Cadastrando tarefa',
            success: 'Tarefa cadastrada com sucesso!',
            error: {
                render({ data }) {
                    const error = data as AxiosError<{ message?: string }>;
                    return error.response?.data?.message || "Erro ao cadastrar tarefa";
                }
            }
        }, { theme: "dark", closeOnClick: true});
    }

    return (
        <main>
            <form onSubmit={handleSubmit(submit)} className={style.form}>
                <input type="text" className={errors.name ? style.error : style.default} placeholder="Digite o nome do trabalho" {...register("name")} />
                {errors.name ? <p>{errors.name.message}</p> : null}
                <input type="number" step=".01" className={errors.value ? style.error : style.default} placeholder="Digite o valor do trabalho" {...register("value")} />
                {errors.value ? <p>{errors.value.message}</p> : null}
                
                <button type="submit">Cadastrar trabalho</button>
            </form>
            <DtgTasks tasks={tasks}/>
            <ToastContainer />
        </main>
    )
}

export default Tasks;