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
exports.validateData = void 0;
const orderItem_schema_1 = require("../schemas/orderItem.schema");
const validateData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItemInfo = orderItem_schema_1.OrderItemOmitIdSchema.parse(req.body);
    req.body = orderItemInfo;
    next();
});
exports.validateData = validateData;
