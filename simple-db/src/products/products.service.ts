import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class ProductsService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  async totalProducts(): Promise<any> {
    return await this.knex.table('product').count('id').where('removed', 0);
  }

  async findAll(): Promise<any> {
    /*const total = await this.knex
      .table('product')
      .count('id')
      .where('removed', 0);
      */
    // let Pages = total / itemsPerPage;
    const products = await this.knex
      .table('product')
      .select('*')
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

  async softDelete(id: number, rm: boolean): Promise<any> {
    return await this.knex('product').where('id', id).update('removed', rm);
  }

  async search(sp: any): Promise<any> {
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
        // type_description: 'producttype.description',
        // t_id: 'producttype.id',
      })
      // .join('producttype', 'product.type_id', 'producttype.id')
      .where('product.description', 'like', `%${sp}%`)
      .orWhere('product.reference', 'like', `%${sp}%`);
    // return await this.knex('product').where('description', 'like', `%${sp}%`);
  }
}
