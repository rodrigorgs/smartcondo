import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1716164955079 implements MigrationInterface {
    name = 'InitialSchema1716164955079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "access_key" ("id" SERIAL NOT NULL, "keyString" character varying NOT NULL, "description" character varying, "validFrom" TIMESTAMP NOT NULL, "validTo" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "condoId" integer, "userId" integer, CONSTRAINT "UQ_6fe5dbb4c054dc087ecb2c28219" UNIQUE ("keyString", "condoId"), CONSTRAINT "PK_8bff331b150893bb5833f6e5675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "email" text NOT NULL, "givenName" text NOT NULL, "familyName" text NOT NULL, "picture" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "condo_to_user" ("id" SERIAL NOT NULL, "isManager" boolean NOT NULL, "condoId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "UQ_01acb1bd088d1ddbc15e985e969" UNIQUE ("condoId", "userId"), CONSTRAINT "PK_e0edffd1177421dec1e666dcfef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "condo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "slug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7359934760496e49c7eec0acfe1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_998457746ed4a040fcf3c42c29" ON "condo" ("slug") `);
        await queryRunner.query(`CREATE TABLE "device" ("id" SERIAL NOT NULL, "identifier" character varying NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "condoId" integer NOT NULL, CONSTRAINT "UQ_0211b471fed809bc348cb7e978f" UNIQUE ("slug", "condoId"), CONSTRAINT "UQ_5aea5811659ffdb0f74b3704e97" UNIQUE ("identifier", "condoId"), CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_71e431d65d96046aec01d2d2f2" ON "device" ("slug") `);
        await queryRunner.query(`ALTER TABLE "access_key" ADD CONSTRAINT "FK_fe3ec6496dcbb70d86855ce2bb5" FOREIGN KEY ("condoId") REFERENCES "condo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access_key" ADD CONSTRAINT "FK_92152f1cd5fa4b4b0b8ba802a2f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "condo_to_user" ADD CONSTRAINT "FK_696a978e0006cea39337e4ef1af" FOREIGN KEY ("condoId") REFERENCES "condo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "condo_to_user" ADD CONSTRAINT "FK_be0b0106fcb3129eb5cd5959e4f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "FK_8c7aae2a33a9445888e5eb25daa" FOREIGN KEY ("condoId") REFERENCES "condo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "FK_8c7aae2a33a9445888e5eb25daa"`);
        await queryRunner.query(`ALTER TABLE "condo_to_user" DROP CONSTRAINT "FK_be0b0106fcb3129eb5cd5959e4f"`);
        await queryRunner.query(`ALTER TABLE "condo_to_user" DROP CONSTRAINT "FK_696a978e0006cea39337e4ef1af"`);
        await queryRunner.query(`ALTER TABLE "access_key" DROP CONSTRAINT "FK_92152f1cd5fa4b4b0b8ba802a2f"`);
        await queryRunner.query(`ALTER TABLE "access_key" DROP CONSTRAINT "FK_fe3ec6496dcbb70d86855ce2bb5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71e431d65d96046aec01d2d2f2"`);
        await queryRunner.query(`DROP TABLE "device"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_998457746ed4a040fcf3c42c29"`);
        await queryRunner.query(`DROP TABLE "condo"`);
        await queryRunner.query(`DROP TABLE "condo_to_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "access_key"`);
    }

}
