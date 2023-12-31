import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertInState1701716138125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            INSERT INTO states("name", "uf") VALUES ('Acre', 'AC');
            INSERT INTO states("name", "uf") VALUES ('Alagoas', 'AL');
            INSERT INTO states("name", "uf") VALUES ('Amazonas', 'AM');
            INSERT INTO states("name", "uf") VALUES ('Amapá', 'AP');
            INSERT INTO states("name", "uf") VALUES ('Bahia', 'BA');
            INSERT INTO states("name", "uf") VALUES ('Ceará', 'CE');
            INSERT INTO states("name", "uf") VALUES ('Distrito Federal', 'DF');
            INSERT INTO states("name", "uf") VALUES ('Espírito Santo', 'ES');
            INSERT INTO states("name", "uf") VALUES ('Goiás', 'GO');
            INSERT INTO states("name", "uf") VALUES ('Maranhão', 'MA');
            INSERT INTO states("name", "uf") VALUES ('Minas Gerais', 'MG');
            INSERT INTO states("name", "uf") VALUES ('Mato Grosso do Sul', 'MS');
            INSERT INTO states("name", "uf") VALUES ('Mato Grosso', 'MT');
            INSERT INTO states("name", "uf") VALUES ('Pará', 'PA');
            INSERT INTO states("name", "uf") VALUES ('Paraíba', 'PB');
            INSERT INTO states("name", "uf") VALUES ('Pernambuco', 'PE');
            INSERT INTO states("name", "uf") VALUES ('Piauí', 'PI');
            INSERT INTO states("name", "uf") VALUES ('Paraná', 'PR');
            INSERT INTO states("name", "uf") VALUES ('Rio de Janeiro', 'RJ');
            INSERT INTO states("name", "uf") VALUES ('Rio Grande do Norte', 'RN');
            INSERT INTO states("name", "uf") VALUES ('Rondônia', 'RO');
            INSERT INTO states("name", "uf") VALUES ('Roraima', 'RR');
            INSERT INTO states("name", "uf") VALUES ('Rio Grande do Sul', 'RS');
            INSERT INTO states("name", "uf") VALUES ('Santa Catarina', 'SC');
            INSERT INTO states("name", "uf") VALUES ('Sergipe', 'SE');
            INSERT INTO states("name", "uf") VALUES ('São Paulo', 'SP');
            INSERT INTO states("name", "uf") VALUES ('Tocantins', 'TO');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DELETE FROM public.states;
        `);
  }
}
