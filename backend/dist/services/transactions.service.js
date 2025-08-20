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
exports.deleteTransactionService = exports.updateTransactionService = exports.readTransactionService = exports.createTransactionService = void 0;
const data_source_1 = require("../data-source");
const transactions_entity_1 = require("../entities/transactions.entity");
const error_1 = require("../error");
const createTransactionService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionRepo = data_source_1.AppDataSource.getRepository(transactions_entity_1.Transaction);
    const transaction = transactionRepo.create(payload);
    return yield transactionRepo.save(transaction);
});
exports.createTransactionService = createTransactionService;
const readTransactionService = () => __awaiter(void 0, void 0, void 0, function* () {
    const transactionRepo = data_source_1.AppDataSource.getRepository(transactions_entity_1.Transaction);
    const transactions = yield transactionRepo.find();
    return transactions;
});
exports.readTransactionService = readTransactionService;
const updateTransactionService = (transactionId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionRepo = data_source_1.AppDataSource.getRepository(transactions_entity_1.Transaction);
    const transaction = yield transactionRepo.findOneBy({ id: parseInt(transactionId) });
    if (!transaction)
        throw new error_1.AppError("Transaction not found", 404);
    const infoUpdated = Object.assign({}, transaction, payload);
    return yield transactionRepo.save(infoUpdated);
});
exports.updateTransactionService = updateTransactionService;
const deleteTransactionService = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionRepo = data_source_1.AppDataSource.getRepository(transactions_entity_1.Transaction);
    const transaction = yield transactionRepo.findOneBy({ id: parseInt(transactionId) });
    if (!transaction)
        throw new error_1.AppError("Transaction not found", 404);
    yield transactionRepo.delete({ id: parseInt(transactionId) });
});
exports.deleteTransactionService = deleteTransactionService;
