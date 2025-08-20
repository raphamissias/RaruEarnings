import z from "zod";

const OrderItemSchema = z.object({
    id: z.number(),
    order: z.number(),
    task: z.number(),
});

const OrderItemOmitIdSchema = OrderItemSchema.omit({id: true});

const OrderItemPartialSchema = OrderItemSchema.partial().omit({id: true});

export { OrderItemSchema, OrderItemOmitIdSchema, OrderItemPartialSchema };