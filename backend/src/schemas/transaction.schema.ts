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
    name: z.string(),
    value: z.number(),
    isDiscount: z.boolean().default(false),
    date: z.string().transform((val) => {
      const [year, month, day] = val.split('-');
      const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day) + 2));
      return date.toLocaleDateString('pt-BR');
    }),
}));


const TransactionOmitIdSchema = TransactionSchema.omit({id: true});

const TransactionPartialSchema = TransactionSchema.partial().omit({id: true});

export { TransactionSchema, TransactionOmitIdSchema, TransactionReadSchema, TransactionPartialSchema };