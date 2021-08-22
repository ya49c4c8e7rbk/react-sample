import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1629462511368 implements MigrationInterface {
  name = 'User1629462511368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sample_db\`.\`user\` ADD \`email\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sample_db\`.\`user\` DROP COLUMN \`email\``,
    );
  }
}
