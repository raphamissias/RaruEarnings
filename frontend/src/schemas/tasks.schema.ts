import { z } from "zod";

export const taskSchema = z.object({
    name: z.string("O campo nome é obrigatório").min(3, "O nome deve ter no mínimo 3 carateres"),
    value: z.coerce.number().positive("O campo valor é obrigatório")
})

export type TTaskFormValues = z.infer<typeof taskSchema>;