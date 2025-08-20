import { Router } from "express"
import { readTransactionController, createTransactionController, updateTransactionController, deleteTransactionController } from "../controllers/transactions.controller"
import { validateData } from "../middlewares/transactions.middleware";

const transactionRoutes: Router = Router();

transactionRoutes.get("", readTransactionController);
transactionRoutes.post("", validateData, createTransactionController);
transactionRoutes.patch("/:id", validateData, updateTransactionController);
transactionRoutes.delete("/:id", deleteTransactionController);

export default transactionRoutes;