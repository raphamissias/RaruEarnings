import z from "zod";

const CustomerSchema = z.object({
    id: z.number(),
    name: z.string(),
});

const CustomerIdSchema = z.number();

const CustomerOmitIdSchema = CustomerSchema.omit({ id: true });

const CustomerPartialSchema = CustomerSchema.partial().omit({ id: true });

export { CustomerSchema, CustomerIdSchema, CustomerOmitIdSchema, CustomerPartialSchema };