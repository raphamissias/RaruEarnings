import { Request, Response } from "express"
import { createCustomerService, readCustomerService, updateCustomerService, deleteCustomerService } from "../services/customers.service"
import { Customer } from "../entities/customers.entity";

const createCustomerController = async (req: Request, res: Response) => {
    const customerCreated: Customer = await createCustomerService(req.body);

    return res.status(201).json(customerCreated);
}

const readCustomerController = async (req: Request, res: Response) => {
    const customers: Customer[] = await readCustomerService(); 
    
    return res.status(200).json(customers);
};

const updateCustomerController = async (req: Request, res: Response) => {
    const customerUpdated: Customer = await updateCustomerService(req.params.id, req.body);

    return res.status(200).json(customerUpdated);
}

const deleteCustomerController = async (req: Request, res: Response) => {
    await deleteCustomerService(req.params.id); 
    
    return res.status(204).json();
};


export { createCustomerController, readCustomerController, updateCustomerController, deleteCustomerController };