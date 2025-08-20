"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPartialSchema = exports.UserOmitIdSchema = exports.UserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const UserSchema = zod_1.default.object({
    id: zod_1.default.number(),
    name: zod_1.default.string(),
    email: zod_1.default.email(),
    password: zod_1.default.string(),
});
exports.UserSchema = UserSchema;
const UserOmitIdSchema = UserSchema.omit({ id: true });
exports.UserOmitIdSchema = UserOmitIdSchema;
const UserPartialSchema = UserSchema.partial().omit({ id: true });
exports.UserPartialSchema = UserPartialSchema;
