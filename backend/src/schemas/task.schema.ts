import z from "zod";

const TaskSchema = z.object({
    id: z.number(),
    name: z.string(),
    value: z.number(),
});

const TaskOmidIdSchema = TaskSchema.omit({id: true});

const TaskPartialSchema = TaskSchema.partial().omit({id: true});

export { TaskSchema, TaskOmidIdSchema, TaskPartialSchema };