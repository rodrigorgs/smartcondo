import { MigrationInterface, QueryRunner } from "typeorm";

export class AllowPermanentKey1716312314530 implements MigrationInterface {
    name = 'AllowPermanentKey1716312314530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access_key" ALTER COLUMN "validFrom" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "access_key" ALTER COLUMN "validTo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access_key" ALTER COLUMN "validTo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "access_key" ALTER COLUMN "validFrom" SET NOT NULL`);
    }

}
