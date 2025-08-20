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
exports.deleteCustomerController = exports.updateCustomerController = exports.readCustomerController = exports.createCustomerController = void 0;
const customers_service_1 = require("../services/customers.service");
const createCustomerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerCreated = yield (0, customers_service_1.createCustomerService)(req.body);
    return res.status(201).json(customerCreated);
});
exports.createCustomerController = createCustomerController;
const readCustomerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield (0, customers_service_1.readCustomerService)();
    return res.status(200).json(customers);
});
exports.readCustomerController = readCustomerController;
const updateCustomerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerUpdated = yield (0, customers_service_1.updateCustomerService)(req.params.id, req.body);
    return res.status(200).json(customerUpdated);
});
exports.updateCustomerController = updateCustomerController;
const deleteCustomerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, customers_service_1.deleteCustomerService)(req.params.id);
    return res.status(204).json();
});
exports.deleteCustomerController = deleteCustomerController;
