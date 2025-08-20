import z from "zod";

const OrderSchema = z.object({
    id: z.number(),
    user: z.number(),
    customer: z.number(),
    teeths: z.string(),
    color: z.string(),
    date: z.string().date({ message: "Data inválida" }).transform((val) => new Date(val))
});

const OrderOmitIdSchema = OrderSchema.omit({id: true});

const OrderPartialSchema = OrderSchema.partial().omit({id: true});

export { OrderSchema, OrderOmitIdSchema, OrderPartialSchema };