import { MigrationInterface, QueryRunner } from "typeorm";

export class FixOrderItems1754491041538 implements MigrationInterface {
    name = 'FixOrderItems1754491041538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderItems" ADD "taskId" integer`);
        await queryRunner.query(`ALTER TABLE "orderItems" ADD CONSTRAINT "FK_bf8914976bed98cfa119fe1f8a0" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderItems" DROP CONSTRAINT "FK_bf8914976bed98cfa119fe1f8a0"`);
        await queryRunner.query(`ALTER TABLE "orderItems" DROP COLUMN "taskId"`);
    }

}
