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
exports.deleteOrderController = exports.updateOrderController = exports.readOrderController = exports.createOrderController = void 0;
const orders_service_1 = require("../services/orders.service");
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCreated = yield (0, orders_service_1.createOrderService)(req.body);
    return res.status(201).json(orderCreated);
});
exports.createOrderController = createOrderController;
const readOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, orders_service_1.readOrderService)(req.query);
    return res.status(200).json(orders);
});
exports.readOrderController = readOrderController;
const updateOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderUpdated = yield (0, orders_service_1.updateOrderService)(req.params.id, req.body);
    return res.status(200).json(orderUpdated);
});
exports.updateOrderController = updateOrderController;
const deleteOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, orders_service_1.deleteOrderService)(req.params.id);
    return res.status(204).json();
});
exports.deleteOrderController = deleteOrderController;
