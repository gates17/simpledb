// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.productService.findAll();
  }

  @Post()
  async create(@Body() body): Promise<any> {
    return await this.productService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return await this.productService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body): Promise<any> {
    return await this.productService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    return this.productService.delete(id);
  }

  /* @Delete()
  async removeAll(@Body() body): Promise<any> {
    return this.productService.toDelete(body);
  } */

  @Put(':id')
  async softRemove(@Param('id') id: number, @Body() rm): Promise<any> {
    return this.productService.softDelete(id, rm);
  }

  @Get('page/:itemsPerPage/:pageNumber')
  async page(
    @Param('itemsPerPage') itemsPerPage: number,
    @Param('pageNumber') pageNumber: number,
  ): Promise<any> {
    return await this.productService.pages(itemsPerPage, pageNumber);
  }

  @Get('removed/:itemsPerPage/:pageNumber')
  async removed(
    @Param('itemsPerPage') itemsPerPage: number,
    @Param('pageNumber') pageNumber: number,
  ): Promise<any> {
    return await this.productService.removed(itemsPerPage, pageNumber);
  }
}
