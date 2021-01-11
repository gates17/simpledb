// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SalesHistoryService } from './sales-history.service';

@Controller('sales-history')
export class SalesHistoryController {
  constructor(private readonly salesService: SalesHistoryService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.salesService.findAll();
  }

  @Post()
  async create(@Body() body): Promise<any> {
    return await this.salesService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return await this.salesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body): Promise<any> {
    return await this.salesService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    return this.salesService.delete(id);
  }

  @Get('search/:sp')
  async search(@Param('sp') sp: any): Promise<any> {
    return this.salesService.search(sp);
  }
}
