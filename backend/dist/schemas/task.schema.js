"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPartialSchema = exports.TaskOmidIdSchema = exports.TaskSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const TaskSchema = zod_1.default.object({
    id: zod_1.default.number(),
    name: zod_1.default.string(),
    value: zod_1.default.number(),
});
exports.TaskSchema = TaskSchema;
const TaskOmidIdSchema = TaskSchema.omit({ id: true });
exports.TaskOmidIdSchema = TaskOmidIdSchema;
const TaskPartialSchema = TaskSchema.partial().omit({ id: true });
exports.TaskPartialSchema = TaskPartialSchema;
