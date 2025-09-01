import z from "zod";

const TransactionSchema = z.object({
    id: z.number(),
    userId: z.number(),
    name: z.string(),
    value: z.number(),
    isDiscount: z.boolean().default(false),
    date: z.string().date({ message: "Data inválida" }).transform((val) => new Date(val)),
});

const TransactionReadSchema = z.array(z.object({
    id: z.number(),
    userId: z.number(),
    name: z.string(),
    value: z.number(),
    isDiscount: z.boolean().default(false),
    date: z.string().date().transform((val) => new Date(val).toLocaleDateString('pt-BR', {
        year: 'numeric', month: '2-digit', day: '2-digit'
    })),
}));


const TransactionOmitIdSchema = TransactionSchema.omit({id: true});

const TransactionPartialSchema = TransactionSchema.partial().omit({id: true});

export { TransactionSchema, TransactionOmitIdSchema, TransactionReadSchema, TransactionPartialSchema };