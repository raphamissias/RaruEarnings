import style from "./style.module.css"
import DtgTasks from "./DtgTasks";
import { useContext } from "react";
import { createTask } from "../../database/tasks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema, taskSchema } from "../../schemas/tasks.schema";
import type { ITaskFormValues } from "../../interfaces/tasks.interface";
import { toast, ToastContainer } from "react-toastify";
import { TasksContext } from "../../contexts/tasks";

const Tasks = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ITaskFormValues>({
        resolver: zodResolver(taskFormSchema)
    });

    const { tasks } = useContext(TasksContext);

    const submit = async (formData: ITaskFormValues) => {
        try {
            const taskValues = taskSchema.parse(formData);
            const response = createTask(taskValues.name, taskValues.value);
            registerNotify(response);
        } catch (error) {
            console.log(error)
        }
    }

    const registerNotify = (submitReturn: Promise<Response>) => {
        return toast.promise(submitReturn, {
            pending: 'Cadastrando tarefa',
            success: 'Tarefa cadastrada com sucesso!',
            error: {
                render({ data }) {
                    return `${data}`;
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