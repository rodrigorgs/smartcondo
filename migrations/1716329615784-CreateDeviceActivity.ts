import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDeviceActivity1716329615784 implements MigrationInterface {
    name = 'CreateDeviceActivity1716329615784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "device_activity" ("id" SERIAL NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "successful" boolean NOT NULL, "deviceId" integer NOT NULL, "loggedInUserId" integer, "accessKeyId" integer, CONSTRAINT "PK_91db67ad912b4d85022712ee2ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "device_activity" ADD CONSTRAINT "FK_29064f0942f97a8f9542108b238" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "device_activity" ADD CONSTRAINT "FK_5ce9f50338d3e326abcd5040631" FOREIGN KEY ("loggedInUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "device_activity" ADD CONSTRAINT "FK_84ed94660030927bac15529ebc9" FOREIGN KEY ("accessKeyId") REFERENCES "access_key"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_activity" DROP CONSTRAINT "FK_84ed94660030927bac15529ebc9"`);
        await queryRunner.query(`ALTER TABLE "device_activity" DROP CONSTRAINT "FK_5ce9f50338d3e326abcd5040631"`);
        await queryRunner.query(`ALTER TABLE "device_activity" DROP CONSTRAINT "FK_29064f0942f97a8f9542108b238"`);
        await queryRunner.query(`DROP TABLE "device_activity"`);
    }

}
