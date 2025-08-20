import { ICustomerOmitId } from "../interfaces/models/customers";
import { Customer } from "../entities/customers.entity";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const createCustomerService = async (payload: ICustomerOmitId) => {
    const customerRepo = AppDataSource.getRepository(Customer);

    const customer: Customer | null = await customerRepo.findOneBy({ name: payload.name });
    if (customer) throw new AppError("Customer already exists", 409)

    const newCustomer: Customer = customerRepo.create(payload);
    
    return await customerRepo.save(newCustomer);
};

const readCustomerService = async () => {
    const customerRepo = AppDataSource.getRepository(Customer);

    const customers: Customer[] = await customerRepo.find();

    return customers;
};

const updateCustomerService = async (customerId: string, payload: Partial<ICustomerOmitId>) => {
    const customerRepo = AppDataSource.getRepository(Customer);

    const customer = await customerRepo.findOneBy({ id: parseInt(customerId) });
    if (!customer) throw new AppError("Customer not found.", 404)

    const infoUpdated: Customer = Object.assign({}, customer, payload);

    return await customerRepo.save(infoUpdated);
};

const deleteCustomerService = async (customerId: string) => {
    const customerRepo = AppDataSource.getRepository(Customer);

    const customer = await customerRepo.findOneBy({ id: parseInt(customerId) });
    if (!customer) throw new AppError("Customer not found.", 404);

    await customerRepo.delete({id: customer.id });
};

export { createCustomerService, readCustomerService, updateCustomerService, deleteCustomerService };