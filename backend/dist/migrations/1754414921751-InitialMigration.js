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
exports.InitialMigration1754414921751 = void 0;
class InitialMigration1754414921751 {
    constructor() {
        this.name = 'InitialMigration1754414921751';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "password" character varying(120) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "value" numeric NOT NULL, "isDiscount" boolean NOT NULL DEFAULT false, "createdAt" date NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "value" numeric NOT NULL, CONSTRAINT "UQ_396d500ff7f1b82771ddd812fd1" UNIQUE ("name"), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying(75) NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "teeths" character varying(45) NOT NULL, "color" character varying(45) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "userId" integer, "customerId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "orderItems" ("id" SERIAL NOT NULL, "orderId" integer, CONSTRAINT "PK_b1b864ba2b7d5762d34265cc8b8" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "orderItems" ADD CONSTRAINT "FK_391c9e5d5af8d7d7ce4b96db80e" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orderItems" DROP CONSTRAINT "FK_391c9e5d5af8d7d7ce4b96db80e"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
            yield queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
            yield queryRunner.query(`DROP TABLE "orderItems"`);
            yield queryRunner.query(`DROP TABLE "orders"`);
            yield queryRunner.query(`DROP TABLE "customers"`);
            yield queryRunner.query(`DROP TABLE "tasks"`);
            yield queryRunner.query(`DROP TABLE "transactions"`);
            yield queryRunner.query(`DROP TABLE "users"`);
        });
    }
}
exports.InitialMigration1754414921751 = InitialMigration1754414921751;
