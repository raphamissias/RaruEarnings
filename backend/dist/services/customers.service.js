"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerService = exports.updateCustomerService = exports.readCustomerService = exports.createCustomerService = void 0;
const customers_entity_1 = require("../entities/customers.entity");
const data_source_1 = require("../data-source");
const error_1 = require("../error");
const createCustomerService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const customerRepo = data_source_1.AppDataSource.getRepository(customers_entity_1.Customer);
    const customer = yield customerRepo.findOneBy({ name: payload.name });
    if (customer)
        throw new error_1.AppError("Customer already exists", 409);
    const newCustomer = customerRepo.create(payload);
    return yield customerRepo.save(newCustomer);
});
exports.createCustomerService = createCustomerService;
const readCustomerService = () => __awaiter(void 0, void 0, void 0, function* () {
    const customerRepo = data_source_1.AppDataSource.getRepository(customers_entity_1.Customer);
    const customers = yield customerRepo.find();
    return customers;
});
exports.readCustomerService = readCustomerService;
const updateCustomerService = (customerId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const customerRepo = data_source_1.AppDataSource.getRepository(customers_entity_1.Customer);
    const customer = yield customerRepo.findOneBy({ id: parseInt(customerId) });
    if (!customer)
        throw new error_1.AppError("Customer not found.", 404);
    const infoUpdated = Object.assign({}, customer, payload);
    return yield customerRepo.save(infoUpdated);
});
exports.updateCustomerService = updateCustomerService;
const deleteCustomerService = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const customerRepo = data_source_1.AppDataSource.getRepository(customers_entity_1.Customer);
    const customer = yield customerRepo.findOneBy({ id: parseInt(customerId) });
    if (!customer)
        throw new error_1.AppError("Customer not found.", 404);
    yield customerRepo.delete({ id: customer.id });
});
exports.deleteCustomerService = deleteCustomerService;
