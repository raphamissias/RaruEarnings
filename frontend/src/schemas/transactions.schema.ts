import z from "zod";

export const transactionFormSchema = z.object({
    name: z.string(),
    value: z.string()
    .transform((val) => parseFloat(val.replace(',', '.')))
    .refine((val) => !isNaN(val), { message: "Valor inválido" })
    .refine((val) => val >= 0, { message: "O valor deve ser maior ou igual a zero" }),
    isDiscount: z.boolean(),
    date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato de data inválido: dd/mm/aaaa"),
});

export type ITransactionFormValues = z.infer<typeof transactionFormSchema>;