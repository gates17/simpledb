import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class AppService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  /*
  async getProducts(): Promise<any> {
    let products = [];
    const trx = await this.knex.transaction();
    try {
      products = await trx.table('producttype').select().from('producttype');
      console.log(products);
      trx.commit();
    } catch {
      trx.rollback();
    }
    return products;
  }
  */
}
