import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'テストユーザ',
          userId: 'test-user',
          email: 'test-user@example.com',
          password: 'password',
        },
      ])
      .execute();
  }
}
