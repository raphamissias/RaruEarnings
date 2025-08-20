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
exports.FixOrderItems1754491041538 = void 0;
class FixOrderItems1754491041538 {
    constructor() {
        this.name = 'FixOrderItems1754491041538';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orderItems" ADD "taskId" integer`);
            yield queryRunner.query(`ALTER TABLE "orderItems" ADD CONSTRAINT "FK_bf8914976bed98cfa119fe1f8a0" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orderItems" DROP CONSTRAINT "FK_bf8914976bed98cfa119fe1f8a0"`);
            yield queryRunner.query(`ALTER TABLE "orderItems" DROP COLUMN "taskId"`);
        });
    }
}
exports.FixOrderItems1754491041538 = FixOrderItems1754491041538;
