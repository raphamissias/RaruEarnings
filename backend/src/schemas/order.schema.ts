import z from "zod";
import { TaskReadSchemaObject } from "./task.schema";
import { CustomerSchema } from "./customer.schema";

const OrderSchema = z.object({
    id: z.number(),
    user: z.number(),
    customer: z.number(),
    patient: z.string().nullish().default(null),
    teeths: z.string(),
    color: z.string(),
    date: z.string().date({ message: "Data inválida" }).transform((val) => new Date(val))
});

const OrderReadSchema = z.array(z.object({
    id: z.number(),
    patient: z.string().nullish(),
    teeths: z.string(),
    color: z.string(),
    date: z.string().date().transform((val) => new Date(val).toLocaleDateString('pt-BR', {
        year: 'numeric', month: '2-digit', day: '2-digit'
    })),
    customer: CustomerSchema,
    items: z.array(z.object({
        task: TaskReadSchemaObject
    })),
}));

const OrderOmitIdSchema = OrderSchema.omit({id: true});

const OrderPartialSchema = OrderSchema.partial().omit({id: true});

export { OrderSchema, OrderReadSchema, OrderOmitIdSchema, OrderPartialSchema };