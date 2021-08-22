import {MigrationInterface, QueryRunner} from "typeorm";

export class User1629465092411 implements MigrationInterface {
    name = 'User1629465092411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` CHANGE \`userid\` \`userid\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` DROP COLUMN \`userid\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` DROP COLUMN \`firstname\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` DROP COLUMN \`lastname\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` ADD \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` ADD \`lastname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` ADD \`firstname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` ADD \`userid\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` ADD PRIMARY KEY (\`userid\`)`);
        await queryRunner.query(`ALTER TABLE \`sample_db\`.\`users\` CHANGE \`userid\` \`userid\` int NOT NULL AUTO_INCREMENT`);
    }

}
