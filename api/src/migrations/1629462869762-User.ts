import {MigrationInterface, QueryRunner} from "typeorm";

export class User1629462869762 implements MigrationInterface {
    name = 'User1629462869762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`user\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`user\` ADD \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`user\` ADD \`refreshtoken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`user\` ADD \`refreshtokenexp\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`user\` DROP COLUMN \`refreshtokenexp\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`user\` DROP COLUMN \`refreshtoken\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`user\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`user\` ADD \`user_id\` varchar(255) NOT NULL`);
    }

}
