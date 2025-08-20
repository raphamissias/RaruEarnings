import { Router } from "express"
import { readCustomerController, createCustomerController, updateCustomerController, deleteCustomerController } from "../controllers/customers.controller"
import { validateData } from "../middlewares/customers.middleware";

const customerRoutes: Router = Router();

customerRoutes.get("", readCustomerController);
customerRoutes.post("", validateData, createCustomerController);
customerRoutes.patch("/:id", validateData, updateCustomerController);
customerRoutes.delete("/:id", deleteCustomerController);

export default customerRoutes;