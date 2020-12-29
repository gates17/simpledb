// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductmaterialService } from './productmaterial.service';

@Controller('productmaterial')
export class ProductmaterialController {
  constructor(private readonly materialService: ProductmaterialService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.materialService.findAll();
  }

  @Post()
  async create(@Body() body): Promise<any> {
    return await this.materialService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return await this.materialService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body): Promise<any> {
    return await this.materialService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    return this.materialService.delete(id);
  }
}
