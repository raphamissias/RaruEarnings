"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemPartialSchema = exports.OrderItemOmitIdSchema = exports.OrderItemSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const OrderItemSchema = zod_1.default.object({
    id: zod_1.default.number(),
    order: zod_1.default.number(),
    task: zod_1.default.number(),
});
exports.OrderItemSchema = OrderItemSchema;
const OrderItemOmitIdSchema = OrderItemSchema.omit({ id: true });
exports.OrderItemOmitIdSchema = OrderItemOmitIdSchema;
const OrderItemPartialSchema = OrderItemSchema.partial().omit({ id: true });
exports.OrderItemPartialSchema = OrderItemPartialSchema;
