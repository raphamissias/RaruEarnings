import z from "zod";

const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.email(),
    password: z.string(),
});

const UserOmitIdSchema = UserSchema.omit({id: true});

const UserPartialSchema = UserSchema.partial().omit({id: true});

export { UserSchema, UserOmitIdSchema, UserPartialSchema };