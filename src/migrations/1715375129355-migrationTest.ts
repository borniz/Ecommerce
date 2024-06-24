import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationTest1715375129355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "USERS" RENAME COLUMN "name" TO "username"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "USERS" RENAME COLUMN "username" TO "name"',
    );
  }
}
