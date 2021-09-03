import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Adminer } from '../entities/adminer.entity';

export default class CreateAdminers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Adminer)
      .values([
        {
          name: 'テスト管理者',
          adminerId: 'test-adminer',
          email: 'test-adminer@example.com',
          password: 'password',
        },
      ])
      .execute();
  }
}
