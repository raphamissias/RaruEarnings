import z from "zod";

const TransactionSchema = z.object({
    id: z.number(),
    userId: z.number(),
    name: z.string(),
    value: z.number(),
    isDiscount: z.boolean().default(false),
    date: z.string().date({ message: "Data inválida" }).transform((val) => new Date(val)),
});

const TransactionOmitIdSchema = TransactionSchema.omit({id: true});

const TransactionPartialSchema = TransactionSchema.partial().omit({id: true});

export { TransactionSchema, TransactionOmitIdSchema, TransactionPartialSchema };