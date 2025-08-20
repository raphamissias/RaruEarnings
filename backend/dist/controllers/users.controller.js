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
exports.deleteUserController = exports.updateUserController = exports.readUserController = exports.createUserController = void 0;
const users_service_1 = require("../services/users.service");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreated = yield (0, users_service_1.createUserService)(req.body);
    return res.status(201).json(userCreated);
});
exports.createUserController = createUserController;
const readUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, users_service_1.readUserService)();
    return res.status(200).json(users);
});
exports.readUserController = readUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userUpdated = yield (0, users_service_1.updateUserService)(req.params.id, req.body);
    return res.status(200).json(userUpdated);
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, users_service_1.deleteUserService)(req.params.id);
    return res.status(204).json();
});
exports.deleteUserController = deleteUserController;
