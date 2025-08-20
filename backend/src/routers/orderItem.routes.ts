import { Router } from "express"
import { readOrderItemController, createOrderItemController, updateOrderItemController, deleteOrderItemController } from "../controllers/orderItems.controller"
import { validateData } from "../middlewares/orderItems.middleware";

const orderItemsRoutes: Router = Router();

orderItemsRoutes.get("", readOrderItemController);
orderItemsRoutes.post("", validateData, createOrderItemController);
orderItemsRoutes.patch("/:id", validateData, updateOrderItemController);
orderItemsRoutes.delete("/:id", deleteOrderItemController);

export default orderItemsRoutes;