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
exports.deleteTaskController = exports.updateTaskController = exports.readTaskController = exports.createTaskController = void 0;
const tasks_service_1 = require("../services/tasks.service");
const createTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskCreated = yield (0, tasks_service_1.createTaskService)(req.body);
    return res.status(201).json(taskCreated);
});
exports.createTaskController = createTaskController;
const readTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, tasks_service_1.readTaskService)();
    return res.status(200).json(tasks);
});
exports.readTaskController = readTaskController;
const updateTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskUpdated = yield (0, tasks_service_1.updateTaskService)(req.params.id, req.body);
    return res.status(200).json(taskUpdated);
});
exports.updateTaskController = updateTaskController;
const deleteTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, tasks_service_1.deleteTaskService)(req.params.id);
    return res.status(204).json();
});
exports.deleteTaskController = deleteTaskController;
