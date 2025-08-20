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
exports.deleteOrderService = exports.updateOrderService = exports.readOrderService = exports.createOrderService = void 0;
const data_source_1 = require("../data-source");
const orders_entity_1 = require("../entities/orders.entity");
const error_1 = require("../error");
const users_entity_1 = require("../entities/users.entity");
const customers_entity_1 = require("../entities/customers.entity");
const createOrderService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderRepo = data_source_1.AppDataSource.getRepository(orders_entity_1.Order);
    const userRepo = data_source_1.AppDataSource.getRepository(users_entity_1.User);
    const customerRepo = data_source_1.AppDataSource.getRepository(customers_entity_1.Customer);
    const user = yield userRepo.findOneBy({ id: payload.user });
    if (!user)
        throw new error_1.AppError("User not found", 404);
    const customer = yield customerRepo.findOneBy({ id: payload.customer });
    if (!customer)
        throw new error_1.AppError("Customer not found", 404);
    const newOrder = orderRepo.create(Object.assign(Object.assign({}, payload), { user,
        customer }));
    return yield orderRepo.save(newOrder);
});
exports.createOrderService = createOrderService;
const readOrderService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderRepo = data_source_1.AppDataSource.getRepository(orders_entity_1.Order);
    const page = Number(payload.page) || 1;
    const perPage = 150;
    const finalDate = payload.finalDate || new Date();
    const initialDate = payload.initialDate || new Date(finalDate.getFullYear(), finalDate.getMonth() - 1, finalDate.getDay());
    const ordersQueryBuilder = orderRepo.createQueryBuilder("orders");
    const orders = yield ordersQueryBuilder
        .leftJoinAndSelect("orders.customer", "customer")
        .leftJoinAndSelect("orders.items", "items")
        .leftJoinAndSelect("items.task", "task")
        .where("date >= :initialDate AND date <= :finalDate", { initialDate: initialDate, finalDate: finalDate })
        .take(perPage)
        .skip(perPage * (page - 1))
        .getMany();
    return orders;
});
exports.readOrderService = readOrderService;
const updateOrderService = (orderId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderRepo = data_source_1.AppDataSource.getRepository(orders_entity_1.Order);
    const order = yield orderRepo.findOneBy({ id: parseInt(orderId) });
    if (!order)
        throw new error_1.AppError("Order not found.", 404);
    const infoUpdated = Object.assign({}, order, payload);
    return yield orderRepo.save(infoUpdated);
});
exports.updateOrderService = updateOrderService;
const deleteOrderService = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderRepo = data_source_1.AppDataSource.getRepository(orders_entity_1.Order);
    const order = yield orderRepo.findOneBy({ id: parseInt(orderId) });
    if (!order)
        throw new error_1.AppError("Order not found.", 404);
    yield orderRepo.delete({ id: parseInt(orderId) });
});
exports.deleteOrderService = deleteOrderService;
