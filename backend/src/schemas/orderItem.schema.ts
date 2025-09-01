import z from "zod";
import { TaskReadSchemaObject } from "./task.schema";

const OrderItemSchema = z.object({
    id: z.number(),
    order: z.number(),
    task: z.number(),
});

const OrderItemReadSchema = z.object({
    id: z.number(),
    task: TaskReadSchemaObject,
})

const OrderItemOmitIdSchema = OrderItemSchema.omit({id: true});

const OrderItemPartialSchema = OrderItemSchema.partial().omit({id: true});

export { OrderItemSchema, OrderItemReadSchema, OrderItemOmitIdSchema, OrderItemPartialSchema };