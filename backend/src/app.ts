import "reflect-metadata";
import express, { json, Application } from "express";
import userRoutes from "./routers/users.routes";
import taskRoutes from "./routers/tasks.routes";
import customerRoutes from "./routers/customers.routes";
import { errorHandler } from "./error";
import orderItemsRoutes from "./routers/orderItem.routes";
import orderRoutes from "./routers/orders.routes";
import transactionRoutes from "./routers/transactions.routes";
import cors from "cors";

const app: Application = express();
app.use(json());
app.use(cors());

app.use("/customers", customerRoutes);
app.use("/orderItems", orderItemsRoutes)
app.use("/orders", orderRoutes);
app.use("/tasks", taskRoutes);
app.use("/transactions", transactionRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

export default app;