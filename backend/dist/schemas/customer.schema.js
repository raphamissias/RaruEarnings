"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPartialSchema = exports.CustomerOmitIdSchema = exports.CustomerIdSchema = exports.CustomerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const CustomerSchema = zod_1.default.object({
    id: zod_1.default.number(),
    name: zod_1.default.string(),
});
exports.CustomerSchema = CustomerSchema;
const CustomerIdSchema = zod_1.default.number();
exports.CustomerIdSchema = CustomerIdSchema;
const CustomerOmitIdSchema = CustomerSchema.omit({ id: true });
exports.CustomerOmitIdSchema = CustomerOmitIdSchema;
const CustomerPartialSchema = CustomerSchema.partial().omit({ id: true });
exports.CustomerPartialSchema = CustomerPartialSchema;
