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
          name: '直井俊樹',
          userId: 't-naoi',
          email: 't-naoi@i-enter.co.jp',
          password: 'password',
        },
      ])
      .execute();
  }
}
