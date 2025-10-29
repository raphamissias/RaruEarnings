import z from "zod";

export const customerSchema = z.object({
    name: z.string("O campo nome é obrigatório").min(3, "O nome deve ter no mínimo 3 caracteres"),
    contact: z.string(),
});
