import z from "zod";

export const orderSchema = z.object({
    customer: z.string().min(3, {message: 'O campo cliente é obrigatório'}),
    patient: z.string().optional(),
    items: z.record(
        z.string(),
        z.string()
    ),
    teeths: z.string().min(1, {message: 'O campo dentes é obrigatório'}),
    color: z.string().min(1, {message: 'O campo cor é obrigatório'}),
    date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato de data inválido: dd/mm/aaaa"),
});

export const updateOrderSchema = z.object({
    customer: z.string("O campo cliente é obrigatório"),
    patient: z.string().optional(),
    teeths: z.string("O campo dentes é obrigatório"),
    color: z.string("O campo cor é obrigatório"),
    date: z.string("O campo data é obrigatório"),
})
.catchall(z.string().min(3, "O campo item não pode ser vazio"))