import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderRelationship1754519757793 implements MigrationInterface {
    name = 'OrderRelationship1754519757793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "orderItemId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_281c74379efc45e1b0f4f25b526" FOREIGN KEY ("orderItemId") REFERENCES "orderItems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_281c74379efc45e1b0f4f25b526"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderItemId"`);
    }

}
