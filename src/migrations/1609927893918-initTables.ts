import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

export class initTables1609927893918 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS=0`);
    await queryRunner.query(`DROP TABLE IF EXISTS user`);
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS=1`);

    await queryRunner.query(
      `CREATE TABLE user (
        id varchar(36),
        name varchar(255),
        login varchar(255),
        password varchar(255),
        ) ENGINE=InnoDB`
    );

    const hashPassword = await bcryptjs.hash('admin', 8);
    await queryRunner.query(
      `INSERT INTO user VALUES ("uniqueid", "admin", "admin", "${hashPassword}", "admin@email.com", 1, 0, null)`
    );
    await queryRunner.query(
      `
      INSERT INTO role_members_user VALUES ("uniqueid", 2)
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user`);
  }
}
