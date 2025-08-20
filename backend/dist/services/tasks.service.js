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
exports.deleteTaskService = exports.updateTaskService = exports.readTaskService = exports.createTaskService = void 0;
const data_source_1 = require("../data-source");
const tasks_entity_1 = require("../entities/tasks.entity");
const error_1 = require("../error");
const createTaskService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepo = data_source_1.AppDataSource.getRepository(tasks_entity_1.Task);
    const task = yield taskRepo.findOneBy({ name: payload.name });
    if (task)
        throw new error_1.AppError("Task already registered", 409);
    const newTask = taskRepo.create(payload);
    return yield taskRepo.save(newTask);
});
exports.createTaskService = createTaskService;
const readTaskService = () => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepo = data_source_1.AppDataSource.getRepository(tasks_entity_1.Task);
    const tasks = yield taskRepo.find();
    return tasks;
});
exports.readTaskService = readTaskService;
const updateTaskService = (taskId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepo = data_source_1.AppDataSource.getRepository(tasks_entity_1.Task);
    const task = yield taskRepo.findOneBy({ id: parseInt(taskId) });
    if (!task)
        throw new error_1.AppError("Task not found.", 404);
    const infoUpdated = Object.assign({}, task, payload);
    return yield taskRepo.save(infoUpdated);
});
exports.updateTaskService = updateTaskService;
const deleteTaskService = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepo = data_source_1.AppDataSource.getRepository(tasks_entity_1.Task);
    const task = yield taskRepo.findOneBy({ id: parseInt(taskId) });
    if (!task)
        throw new error_1.AppError("Task not found.", 404);
    yield taskRepo.delete({ id: parseInt(taskId) });
});
exports.deleteTaskService = deleteTaskService;
