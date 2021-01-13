// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProducttypeService } from './producttype.service';

@Controller('producttype')
export class ProducttypeController {
  constructor(private readonly producttypeService: ProducttypeService) {}

  @Get('page/:itemsPerPage/:pageNumber')
  async page(
    @Param('itemsPerPage') itemsPerPage: number,
    @Param('pageNumber') pageNumber: number,
  ): Promise<any> {
    return await this.producttypeService.pages(itemsPerPage, pageNumber);
  }

  @Get()
  async findAll(): Promise<any> {
    return await this.producttypeService.findAll();
  }

  @Post()
  async create(@Body() body): Promise<any> {
    return await this.producttypeService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return await this.producttypeService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body): Promise<any> {
    return await this.producttypeService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    return this.producttypeService.delete(id);
  }
}
