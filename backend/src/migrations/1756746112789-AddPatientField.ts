import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPatientField1756746112789 implements MigrationInterface {
    name = 'AddPatientField1756746112789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_281c74379efc45e1b0f4f25b526"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "orderItemId" TO "patient"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "patient"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "patient" character varying(75)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "patient"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "patient" integer`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "patient" TO "orderItemId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_281c74379efc45e1b0f4f25b526" FOREIGN KEY ("orderItemId") REFERENCES "orderItems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
