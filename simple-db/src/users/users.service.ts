import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class UsersService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  // private readonly _users = this.knex.table('users').select().from('users');

  async findAll(): Promise<any> {
    let users = [];
    const trx = await this.knex.transaction();
    try {
      users = await trx.table('users').select().from('users');
      trx.commit();
    } catch {
      trx.rollback();
    }
    return users;
  }

  async create(body: any): Promise<any> {
    return await this.knex.table('users').insert(body);
  }

  async findOne(id: number): Promise<any> {
    return await this.knex('users').select('*').where('id', id);
  }

  async findOneName(user: string): Promise<any> {
    return await this.knex('users').select('*').where('user', user);
  }

  async update(id: number, body: any): Promise<any> {
    // body["updatedAt"]=this.knex.fn.now();
    return await this.knex('users').where('id', id).update(body);
  }

  async delete(id: number): Promise<any> {
    return await this.knex('users').where('id', id).del();
  }
}
