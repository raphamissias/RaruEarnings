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
exports.OrderRelationship1754519757793 = void 0;
class OrderRelationship1754519757793 {
    constructor() {
        this.name = 'OrderRelationship1754519757793';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" ADD "orderItemId" integer`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_281c74379efc45e1b0f4f25b526" FOREIGN KEY ("orderItemId") REFERENCES "orderItems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_281c74379efc45e1b0f4f25b526"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderItemId"`);
        });
    }
}
exports.OrderRelationship1754519757793 = OrderRelationship1754519757793;
