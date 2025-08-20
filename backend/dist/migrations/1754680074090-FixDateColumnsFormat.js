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
exports.FixDateColumnsFormat1754680074090 = void 0;
class FixDateColumnsFormat1754680074090 {
    constructor() {
        this.name = 'FixDateColumnsFormat1754680074090';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "createdAt" TO "date"`);
            yield queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "date" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_b942d55b92ededa770041db9ded" UNIQUE ("name")`);
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" DROP DEFAULT`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_b942d55b92ededa770041db9ded"`);
            yield queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "date" SET DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "date" TO "createdAt"`);
        });
    }
}
exports.FixDateColumnsFormat1754680074090 = FixDateColumnsFormat1754680074090;
