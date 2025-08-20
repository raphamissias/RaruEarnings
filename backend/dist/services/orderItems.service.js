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
exports.deleteOrderItemService = exports.updateOrderItemService = exports.readOrderItemService = exports.createOrderItemService = void 0;
const data_source_1 = require("../data-source");
const orderItems_entity_1 = require("../entities/orderItems.entity");
const orders_entity_1 = require("../entities/orders.entity");
const tasks_entity_1 = require("../entities/tasks.entity");
const error_1 = require("../error");
const createOrderItemService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItemRepo = data_source_1.AppDataSource.getRepository(orderItems_entity_1.OrderItem);
    const orderRepo = data_source_1.AppDataSource.getRepository(orders_entity_1.Order);
    const taskRepo = data_source_1.AppDataSource.getRepository(tasks_entity_1.Task);
    const order = yield orderRepo.findOneBy({ id: payload.order });
    if (!order)
        throw new error_1.AppError("Order not found", 404);
    const task = yield taskRepo.findOneBy({ id: payload.task });
    if (!task)
        throw new error_1.AppError("Task not found", 404);
    const newOrderItem = orderItemRepo.create({
        order,
        task
    });
    return yield orderItemRepo.save(newOrderItem);
});
exports.createOrderItemService = createOrderItemService;
const readOrderItemService = () => __awaiter(void 0, void 0, void 0, function* () {
    const orderItemRepo = data_source_1.AppDataSource.getRepository(orderItems_entity_1.OrderItem);
    const orderItems = yield orderItemRepo.find();
    return orderItems;
});
exports.readOrderItemService = readOrderItemService;
const updateOrderItemService = (orderItemId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItemRepo = data_source_1.AppDataSource.getRepository(orderItems_entity_1.OrderItem);
    const orderItem = yield orderItemRepo.findOneBy({ id: parseInt(orderItemId) });
    if (!orderItem)
        throw new error_1.AppError("Order Item not found.", 404);
    const infoUpdated = Object.assign({}, orderItem, payload);
    return yield orderItemRepo.save(infoUpdated);
});
exports.updateOrderItemService = updateOrderItemService;
const deleteOrderItemService = (orderItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItemRepo = data_source_1.AppDataSource.getRepository(orderItems_entity_1.OrderItem);
    const orderItem = yield orderItemRepo.findOneBy({ id: parseInt(orderItemId) });
    if (!orderItem)
        throw new error_1.AppError("Order Item not found.", 404);
    yield orderItemRepo.delete({ id: parseInt(orderItemId) });
});
exports.deleteOrderItemService = deleteOrderItemService;
