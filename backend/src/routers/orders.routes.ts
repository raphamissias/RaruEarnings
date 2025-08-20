import { Router } from "express"
import { readOrderController, createOrderController, updateOrderController, deleteOrderController } from "../controllers/orders.controller"
import { validateData } from "../middlewares/orders.middleware";

const orderRoutes: Router = Router();

orderRoutes.get("", readOrderController);
orderRoutes.post("", validateData, createOrderController);
orderRoutes.patch("/:id", validateData, updateOrderController);
orderRoutes.delete("/:id", deleteOrderController);

export default orderRoutes;