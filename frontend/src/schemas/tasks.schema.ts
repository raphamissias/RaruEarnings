import { z } from "zod";

export const taskSchema = z.object({
    name: z.string("O campo nome é obrigatório").min(3, "O nome deve ter no mínimo 3 caracteres"),
    value: z.coerce.number().positive("O campo valor é obrigatório")
})

export const taskValueSchema = z.number();

export const taskFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  value: z.string()
    .refine((val) => !isNaN(parseFloat(val.replace(',', '.'))), { message: "Valor inválido" })
    .refine((val) => parseFloat(val.replace(',', '.')) >= 0, { message: "O valor deve ser maior ou igual a zero" }),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;