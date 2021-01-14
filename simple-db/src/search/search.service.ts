import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class SearchService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  async getCat(type, material): Promise<any> {
    if (type && !material && material !== undefined) {
      return await this.knex('producttype')
        .where('producttype.description', 'like', `%${type}%`)
        .select('*')
        .innerJoin('product', 'producttype.id', 'product.type_id');
    } else if (material && !type && type !== undefined) {
      return await this.knex('productmaterial')
        .select('*')
        .innerJoin('product', 'productmaterial.id', 'product.type_id')
        .where('producttype.description', 'like', `%${type}%`);
    } else if (
      type &&
      material &&
      type !== undefined &&
      material !== undefined
    ) {
      return await this.knex('producttype')
        .select('*')
        .innerJoin('product', 'producttype.id', 'product.type_id')
        .where('producttype.description', 'like', `%${type}%`);
    }
  }

  async getProduct(sp: any): Promise<any> {
    return await this.knex('product')
      .select({
        id: 'product.id',
        reference: 'product.reference',
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
  }

  async getType(sp: any): Promise<any> {
    return await this.knex('producttype')
      .select('*')
      // .join('producttype', 'product.type_id', 'producttype.id')
      .where('producttype.description', 'like', `%${sp}%`);
  }

  async getMaterial(sp: any): Promise<any> {
    return await this.knex('productmaterial')
      .select('*')
      .where('productmaterial.description', 'like', `%${sp}%`);
  }
}
