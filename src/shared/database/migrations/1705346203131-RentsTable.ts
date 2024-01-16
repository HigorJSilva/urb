import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RentsTable1705346203131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rents',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'property_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'tenant_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'dueDate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'bool',
            default: true,
            isNullable: false,
          },
          {
            name: 'startDate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'endDate',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
      false,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE rents`);
  }
}
