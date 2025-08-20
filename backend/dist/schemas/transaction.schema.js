"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionPartialSchema = exports.TransactionOmitIdSchema = exports.TransactionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const TransactionSchema = zod_1.default.object({
    id: zod_1.default.number(),
    userId: zod_1.default.number(),
    name: zod_1.default.string(),
    value: zod_1.default.number(),
    isDiscount: zod_1.default.boolean().default(false),
    date: zod_1.default.string().date({ message: "Data inválida" }).transform((val) => new Date(val)),
});
exports.TransactionSchema = TransactionSchema;
const TransactionOmitIdSchema = TransactionSchema.omit({ id: true });
exports.TransactionOmitIdSchema = TransactionOmitIdSchema;
const TransactionPartialSchema = TransactionSchema.partial().omit({ id: true });
exports.TransactionPartialSchema = TransactionPartialSchema;
