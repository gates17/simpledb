import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class SearchService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  async getCat(query): Promise<any> {
    if (
      query['type'] &&
      !query['material'] &&
      query['material'] !== undefined &&
      query['material'] === ''
    ) {
      const totalPages: number = await this.knex('product')
        .count('*', {
          as: 'total',
        })
        .innerJoin('producttype', 'product.type_id', 'producttype.id')
        .where('producttype.description', 'like', `%${query['type']}%`)
        .andWhere('product.removed', 0);

      const price = await this.knex
        .table('product')
        .sum({ totalprice: 'price' })
        .innerJoin('producttype', 'product.type_id', 'producttype.id')
        .where('producttype.description', 'like', `%${query['type']}%`)
        .andWhere('product.removed', 0);

      const weight = await this.knex
        .table('product')
        .sum({ totalweight: 'weight' })
        .innerJoin('producttype', 'product.type_id', 'producttype.id')
        .where('producttype.description', 'like', `%${query['type']}%`)
        .andWhere('product.removed', 0);

      const results = await this.knex('product')
        .select({
          id: 'product.id',
          reference: 'product.reference',
          weight: 'product.weight',
          price: 'product.price',
          removed: 'product.removed',
          description: 'product.description',
        })
        .innerJoin('producttype', 'product.type_id', 'producttype.id')
        .where('producttype.description', 'like', `%${query['type']}%`);

      const pagination = { totalPages, price, weight, results };
      return pagination;
    } else if (
      query['material'] &&
      !query['type'] &&
      query['type'] !== undefined &&
      query['type'] === ''
    ) {
      const totalPages: number = await this.knex('product')
        .count('*', {
          as: 'total',
        })
        .innerJoin(
          'productmaterial',
          'product.material_id',
          'productmaterial.id',
        )
        .where('productmaterial.description', 'like', `%${query['material']}%`)
        .andWhere('removed', 0);

      const price = await this.knex
        .table('product')
        .sum({ totalprice: 'price' })
        .innerJoin(
          'productmaterial',
          'product.material_id',
          'productmaterial.id',
        )
        .where('productmaterial.description', 'like', `%${query['material']}%`)
        .andWhere('removed', 0);

      const weight = await this.knex
        .table('product')
        .sum({ totalweight: 'weight' })
        .innerJoin(
          'productmaterial',
          'product.material_id',
          'productmaterial.id',
        )
        .where('productmaterial.description', 'like', `%${query['material']}%`)
        .andWhere('removed', 0);

      const results = await this.knex('product')
        .select({
          id: 'product.id',
          reference: 'product.reference',
          weight: 'product.weight',
          price: 'product.price',
          removed: 'product.removed',
          description: 'product.description',
        })
        .innerJoin(
          'productmaterial',
          'product.material_id',
          'productmaterial.id',
        )
        .where('productmaterial.description', 'like', `%${query['material']}%`);

      const pagination = { totalPages, price, weight, results };
      return pagination;
    } else if (
      query['type'] &&
      query['material'] &&
      query['type'] !== '' &&
      query['type'] !== undefined &&
      query['material'] !== '' &&
      query['material'] !== undefined
    ) {
      const totalPages: number = await this.knex('product')
        .count('*', {
          as: 'total',
        })
        .innerJoin('producttype', 'producttype.id', 'product.type_id')
        .innerJoin(
          'productmaterial',
          'productmaterial.id',
          'product.material_id',
        )
        .where('removed', 0)
        .andWhere('producttype.description', 'like', `%${query['type']}%`)
        .andWhere(
          'productmaterial.description',
          'like',
          `%${query['material']}%`,
        );

      const price = await this.knex
        .table('product')
        .sum({ totalprice: 'price' })
        .innerJoin('producttype', 'producttype.id', 'product.type_id')
        .innerJoin(
          'productmaterial',
          'productmaterial.id',
          'product.material_id',
        )
        .where('removed', 0)
        .andWhere('producttype.description', 'like', `%${query['type']}%`)
        .andWhere(
          'productmaterial.description',
          'like',
          `%${query['material']}%`,
        );
      const weight = await this.knex
        .table('product')
        .sum({ totalweight: 'weight' })
        .innerJoin('producttype', 'producttype.id', 'product.type_id')
        .innerJoin(
          'productmaterial',
          'productmaterial.id',
          'product.material_id',
        )
        .where('removed', 0)
        .andWhere('producttype.description', 'like', `%${query['type']}%`)
        .andWhere(
          'productmaterial.description',
          'like',
          `%${query['material']}%`,
        );

      const results = await this.knex('product')
        .select({
          id: 'product.id',
          reference: 'product.reference',
          weight: 'product.weight',
          price: 'product.price',
          removed: 'product.removed',
          description: 'product.description',
        })
        .innerJoin('producttype', 'producttype.id', 'product.type_id')
        .innerJoin(
          'productmaterial',
          'productmaterial.id',
          'product.material_id',
        )
        .where('removed', 0)
        .andWhere('producttype.description', 'like', `%${query['type']}%`)
        .andWhere(
          'productmaterial.description',
          'like',
          `%${query['material']}%`,
        );
      const pagination = { totalPages, price, weight, results };
      return pagination;
    }
  }

  async getProduct(sp: any): Promise<any> {
    const totalPages: number = await this.knex('product')
      .count('*', {
        as: 'total',
      })
      .where('removed', 0)
      .andWhere('product.description', 'like', `%${sp}%`)
      .orWhere('product.reference', 'like', `%${sp}%`);

    const price = await this.knex
      .table('product')
      .sum({ totalprice: 'price' })
      .where('removed', 0)
      .andWhere('product.description', 'like', `%${sp}%`)
      .orWhere('product.reference', 'like', `%${sp}%`);

    const weight = await this.knex
      .table('product')
      .sum({ totalweight: 'weight' })
      .where('removed', 0)
      .andWhere('product.description', 'like', `%${sp}%`)
      .orWhere('product.reference', 'like', `%${sp}%`);

    const results = await this.knex('product')
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
      .where('product.removed', 0)
      // .join('producttype', 'product.type_id', 'producttype.id')
      .andWhere('product.description', 'like', `%${sp}%`)
      .orWhere('product.reference', 'like', `%${sp}%`);

    const pagination = { totalPages, price, weight, results };
    return pagination;
  }

  /*  const x: number = +pageNumber;
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
    .innerJoin('producttype', 'producttype.id', 'product.type_id')
    .where('removed', 0);

  const price = await this.knex
    .table('product')
    .sum({ totalprice: 'price' })
    .where('removed', 0);

  const weight = await this.knex
    .table('product')
    .sum({ totalweight: 'weight' })
    .where('removed', 0);
  const pagination = { totalPages, price, weight, pageResults };
  return pagination; */

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
