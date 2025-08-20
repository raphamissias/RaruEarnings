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
exports.deleteOrderItemController = exports.updateOrderItemController = exports.readOrderItemController = exports.createOrderItemController = void 0;
const orderItems_service_1 = require("../services/orderItems.service");
const createOrderItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItemCreated = yield (0, orderItems_service_1.createOrderItemService)(req.body);
    return res.status(201).json(orderItemCreated);
});
exports.createOrderItemController = createOrderItemController;
const readOrderItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItems = yield (0, orderItems_service_1.readOrderItemService)();
    return res.status(200).json(orderItems);
});
exports.readOrderItemController = readOrderItemController;
const updateOrderItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItemUpdated = yield (0, orderItems_service_1.updateOrderItemService)(req.params.id, req.body);
    return res.status(200).json(orderItemUpdated);
});
exports.updateOrderItemController = updateOrderItemController;
const deleteOrderItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, orderItems_service_1.deleteOrderItemService)(req.params.id);
    return res.status(204).json();
});
exports.deleteOrderItemController = deleteOrderItemController;
