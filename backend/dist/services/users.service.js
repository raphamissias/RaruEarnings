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
exports.deleteUserService = exports.updateUserService = exports.readUserService = exports.createUserService = void 0;
const data_source_1 = require("../data-source");
const users_entity_1 = require("../entities/users.entity");
const error_1 = require("../error");
const createUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.AppDataSource.getRepository(users_entity_1.User);
    const user = userRepo.create(payload);
    return yield userRepo.save(user);
});
exports.createUserService = createUserService;
const readUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.AppDataSource.getRepository(users_entity_1.User);
    const users = yield userRepo.find();
    return users;
});
exports.readUserService = readUserService;
const updateUserService = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.AppDataSource.getRepository(users_entity_1.User);
    const user = yield userRepo.findOneBy({ id: parseInt(userId) });
    if (!user)
        throw new error_1.AppError("User not found", 404);
    const infoUpdated = Object.assign({}, user, payload);
    return yield userRepo.save(infoUpdated);
});
exports.updateUserService = updateUserService;
const deleteUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.AppDataSource.getRepository(users_entity_1.User);
    const user = yield userRepo.findOneBy({ id: parseInt(userId) });
    if (!user)
        throw new error_1.AppError("User not found", 404);
    yield userRepo.delete({ id: parseInt(userId) });
});
exports.deleteUserService = deleteUserService;
