import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class ProducttypeService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  async findAll(): Promise<any> {
    let productTypes = [];
    const trx = await this.knex.transaction();
    try {
      productTypes = await trx
        .table('producttype')
        .select()
        .from('producttype');
      trx.commit();
    } catch {
      trx.rollback();
    }
    return productTypes;
  }

  async create(body: any): Promise<any> {
    return await this.knex.table('producttype').insert(body);
  }

  async findOne(id: number): Promise<any> {
    return await this.knex('producttype').select('*').where('id', id);
  }

  async update(id: number, body: any): Promise<any> {
    //body["updatedAt"]=this.knex.fn.now();
    return await this.knex('producttype').where('id', id).update(body);
  }

  async delete(id: number): Promise<any> {
    return await this.knex('producttype').where('id', id).del();
  }
}
