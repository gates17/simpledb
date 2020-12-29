/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class ProductmaterialService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  async findAll(): Promise<any> {
    let materials = [];
    const trx = await this.knex.transaction();
    try {
      materials = await trx.table('productmaterial').select().from('productmaterial');
      trx.commit();
    } catch {
      trx.rollback();
    }
    return materials;
  }

  async create(body: any): Promise<any> {
    return await this.knex.table('productmaterial').insert(body);
  }

  async findOne(id: number): Promise<any> {
    return await this.knex('productmaterial').select('*').where('id', id);
  }

  async update(id: number, body: any): Promise<any> {
    //body["updatedAt"]=this.knex.fn.now();
    return await this.knex('productmaterial').where('id', id).update(body);
  }

  async delete(id: number): Promise<any> {
    return await this.knex('productmaterial').where('id', id).del();
  }
}
