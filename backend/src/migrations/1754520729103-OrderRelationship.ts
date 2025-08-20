import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderRelationship1754520729103 implements MigrationInterface {
    name = 'OrderRelationship1754520729103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "createdAt" TO "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "date" TO "createdAt"`);
    }

}
