"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPartialSchema = exports.OrderOmitIdSchema = exports.OrderSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const OrderSchema = zod_1.default.object({
    id: zod_1.default.number(),
    user: zod_1.default.number(),
    customer: zod_1.default.number(),
    teeths: zod_1.default.string(),
    color: zod_1.default.string(),
    date: zod_1.default.string().date({ message: "Data inválida" }).transform((val) => new Date(val))
});
exports.OrderSchema = OrderSchema;
const OrderOmitIdSchema = OrderSchema.omit({ id: true });
exports.OrderOmitIdSchema = OrderOmitIdSchema;
const OrderPartialSchema = OrderSchema.partial().omit({ id: true });
exports.OrderPartialSchema = OrderPartialSchema;
