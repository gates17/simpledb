import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class ProductsService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  async pages(itemsPerPage: number, pageNumber: number): Promise<any> {
    const x: number = +pageNumber;
    const totalPages: number = await this.knex('product')
      .count('*', {
        as: 'total',
      })
      .where('removed', 0);
    const offset = (x - 1) * itemsPerPage;
    const pageResults = await this.knex('product')
      .select({
        id: 'product.id',
        type_id: 'product.type_id',
        material_id: 'product.material_id',
        reference: 'product.reference',
        description: 'product.description',
        weight: 'product.weight',
        price: 'product.price',
      })
      .offset(offset)
      .limit(itemsPerPage)
      .where('removed', 0);

    const price = await this.knex
      .table('product')
      .sum({ totalprice: 'price' })
      .where('removed', 0);
    const weight = await this.knex
      .table('product')
      .sum({ totalweight: 'weight' })
      .where('removed', 0);
    // const results = { price, weight, pageResults };
    const pagination = { totalPages, price, weight, pageResults };
    return pagination;
  }

  async removed(itemsPerPage: number, pageNumber: number): Promise<any> {
    const x: number = +pageNumber;
    const totalPages: number = await this.knex('product')
      .count('*', {
        as: 'total',
      })
      .where('removed', 1);
    const offset = (x - 1) * itemsPerPage;
    const pageResults = await this.knex('product')
      .offset(offset)
      .limit(itemsPerPage)
      .where('removed', 1);

    const price = await this.knex
      .table('product')
      .sum({ totalprice: 'price' })
      .where('removed', 1);
    const weight = await this.knex
      .table('product')
      .sum({ totalweight: 'weight' })
      .where('removed', 1);
    // const results = { price, weight, pageResults };
    const pagination = { totalPages, price, weight, pageResults };
    return pagination;
  }

  async findAll(): Promise<any> {
    const products = await this.knex
      .table('product')
      .select({
        type_id: 'product.type_id',
        material_id: 'product.material_id',
        reference: 'product.reference',
        description: 'product.description',
        weight: 'product.weight',
        price: 'product.price',
      })
      .from('product')
      .where('removed', 0);

    const price = await this.knex.table('product').sum({ totalprice: 'price' });
    const weight = await this.knex
      .table('product')
      .sum({ totalweight: 'weight' });
    const results = { price, weight, products };
    return results;
  }

  async create(body: any): Promise<any> {
    return await this.knex.table('product').insert(body);
  }

  async findOne(id: number): Promise<any> {
    return await this.knex('product').select('*').where('id', id);
  }

  async update(id: number, body: any): Promise<any> {
    // body["updatedAt"]=this.knex.fn.now();
    return await this.knex('product').where('id', id).update(body);
  }

  async delete(id: number): Promise<any> {
    return await this.knex('product').where('id', id).del();
  }

  /* async toDelete(body: any): Promise<any> {
    console.log(body);
    //return await this.knex('product').where('id', id).del();
    return;
  } */

  async softDelete(id: number, rm: number): Promise<any> {
    return await this.knex('product').where('id', id).update('removed', rm);
  }

  /* async search(sp: any): Promise<any> {
    return await this.knex('product')
      .select({
        id: 'product.id',
        store_id: 'product.store_id',
        type_id: 'product.type_id',
        material_id: 'product.material_id',
        reference: 'product.reference',
        state: 'product.state',
        entryDate: 'product.entryDate',
        lastUpdate: 'product.lastUpdate',
        soldDate: 'product.soldDate',
        seller: 'product.seller',
        insertedBy: 'product.insertedBy',
        weight: 'product.weight',
        price: 'product.price',
        removed: 'product.removed',
        description: 'product.description',
      })
      .where('product.description', 'like', `%${sp}%`)
      .orWhere('product.reference', 'like', `%${sp}%`);
  } */
}
