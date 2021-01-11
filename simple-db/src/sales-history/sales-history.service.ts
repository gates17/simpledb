import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class SalesHistoryService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  async findAll(): Promise<any> {
    return await this.knex
      .table('saleshistory')
      .select('*')
      .from('saleshistory');
  }

  async create(body: any): Promise<any> {
    return await this.knex.table('saleshistory').insert(body);
  }

  async findOne(id: number): Promise<any> {
    return await this.knex('saleshistory').select('*').where('id', id);
  }

  async update(id: number, body: any): Promise<any> {
    //body["updatedAt"]=this.knex.fn.now();
    return await this.knex('saleshistory').where('id', id).update(body);
  }

  async delete(id: number): Promise<any> {
    return await this.knex('saleshistory').where('id', id).del();
  }

  async search(sp: any): Promise<any> {
    return await this.knex('saleshistory')
      .select({
        id: 'saleshistory.id',
        store_id: 'saleshistory.store_id',
        type_id: 'saleshistory.type_id',
        material_id: 'saleshistory.material_id',
        reference: 'saleshistory.reference',
        state: 'saleshistory.state',
        entryDate: 'saleshistory.entryDate',
        lastUpdate: 'saleshistory.lastUpdate',
        soldDate: 'saleshistory.soldDate',
        seller: 'saleshistory.seller',
        insertedBy: 'saleshistory.insertedBy',
        weight: 'saleshistory.weight',
        price: 'saleshistory.price',
        description: 'saleshistory.description',
        type_description: 'saleshistorytype.description',
        t_id: 'saleshistorytype.id',
      })
      .join('saleshistorytype', 'saleshistory.type_id', 'saleshistorytype.id')
      .where('saleshistory.description', 'like', `%${sp}%`)
      .orWhere('saleshistorytype.description', 'like', `%${sp}%`);
    // return await this.knex('saleshistory').where('description', 'like', `%${sp}%`);
  }
}
