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
exports.deleteTransactionController = exports.updateTransactionController = exports.readTransactionController = exports.createTransactionController = void 0;
const transactions_service_1 = require("../services/transactions.service");
const createTransactionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionCreated = yield (0, transactions_service_1.createTransactionService)(req.body);
    return res.status(201).json(transactionCreated);
});
exports.createTransactionController = createTransactionController;
const readTransactionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield (0, transactions_service_1.readTransactionService)();
    return res.status(200).json(transactions);
});
exports.readTransactionController = readTransactionController;
const updateTransactionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionUpdated = yield (0, transactions_service_1.updateTransactionService)(req.params.id, req.body);
    return res.status(200).json(transactionUpdated);
});
exports.updateTransactionController = updateTransactionController;
const deleteTransactionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, transactions_service_1.deleteTransactionService)(req.params.id);
    return res.status(204).json();
});
exports.deleteTransactionController = deleteTransactionController;
