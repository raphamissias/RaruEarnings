import z from "zod";

const TaskSchema = z.object({
    id: z.number(),
    name: z.string(),
    value: z.number(),
});

const TaskOmidIdSchema = TaskSchema.omit({id: true});

const TaskPartialSchema = TaskSchema.partial().omit({id: true});

const TaskReadSchema = z.array(z.object({
    id: z.number(),
    name: z.string(),
    value: z.union([z.string(), z.number()]).transform((val) => {
        const num = typeof val === "string" ? Number(val) : val;
        return num.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    })
}))

const TaskReadSchemaObject = z.object({
    id: z.number(),
    name: z.string(),
    value: z.union([z.string(), z.number()]).transform((val) => {
        const num = typeof val === "string" ? Number(val) : val;
        return num.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    })
});


export { TaskSchema, TaskOmidIdSchema, TaskReadSchemaObject, TaskPartialSchema, TaskReadSchema };