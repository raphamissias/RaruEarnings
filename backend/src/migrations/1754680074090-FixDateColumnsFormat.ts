import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDateColumnsFormat1754680074090 implements MigrationInterface {
    name = 'FixDateColumnsFormat1754680074090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "createdAt" TO "date"`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_b942d55b92ededa770041db9ded" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_b942d55b92ededa770041db9ded"`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "date" TO "createdAt"`);
    }

}
