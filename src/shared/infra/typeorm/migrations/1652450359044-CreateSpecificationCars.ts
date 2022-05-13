import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSpecificationCars1652450359044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specification_cars',
        columns: [

        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
