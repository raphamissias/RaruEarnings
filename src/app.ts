import express, { json, Application } from "express"
import userRoutes from "./routers/users"
import taskRoutes from "./routers/tasks"

const app: Application = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

export default app;