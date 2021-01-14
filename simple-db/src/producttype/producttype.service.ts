import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
// import { attachPaginate } from 'knex-paginate';

@Injectable()
export class ProducttypeService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  async pages(itemsPerPage: number, pageNumber: number): Promise<any> {
    const x: number = +pageNumber;
    const totalPages: number = await this.knex('producttype').count('*', {
      as: 'total',
    });
    const offset = (x - 1) * itemsPerPage;
    const pageResults = await this.knex('producttype')
      .offset(offset)
      .limit(itemsPerPage);
    const pagination = { totalPages, pageResults };
    return pagination;
  }

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
    // body["updatedAt"]=this.knex.fn.now();
    return await this.knex('producttype').where('id', id).update(body);
  }

  async delete(id: number): Promise<any> {
    return await this.knex('producttype').where('id', id).del();
  }
}
