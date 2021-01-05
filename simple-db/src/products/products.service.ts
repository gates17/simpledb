import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class ProductsService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  async findAll(): Promise<any> {
    return await this.knex.table('product').select('*').where('removed', 0);
  }

  async create(body: any): Promise<any> {
    return await this.knex.table('product').insert(body);
  }

  async findOne(id: number): Promise<any> {
    return await this.knex('product').select('*').where('id', id);
  }

  async update(id: number, body: any): Promise<any> {
    //body["updatedAt"]=this.knex.fn.now();
    return await this.knex('product').where('id', id).update(body);
  }

  async delete(id: number): Promise<any> {
    return await this.knex('product').where('id', id).del();
  }

  async softDelete(id: number, rm: boolean): Promise<any> {
    return await this.knex('product').where('id', id).update('removed', rm);
  }
}
