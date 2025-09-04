import z from "zod";

export const customerSchema = z.object({
    name: z.string().min(3, "O campo nome é obrigatório")
});