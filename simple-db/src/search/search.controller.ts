import { SearchService } from './search.service';
import { Controller, Get, Logger, Param, Query } from '@nestjs/common';

@Controller('search')
export class SearchController {
  constructor(private readonly _searchService: SearchService) {}

  @Get('cat')
  async getCat(@Query() query): Promise<any> {
    // async getCat(@Param('type') type, @Param('material') material): Promise<any> {
    return await this._searchService.getCat(query);
  }

  @Get('product')
  async getProduct(@Query() query): Promise<any> {
    Logger.log('Product ' + query[0] + query[1] + ' !', 'SEARCHCOTROLLER');
    return await this._searchService.getProduct(query);
  }

  @Get('type/:sp')
  async getType(@Param('sp') sp): Promise<any> {
    return await this._searchService.getType(sp);
  }

  @Get('material/:sp')
  async getMaterial(@Param('sp') sp): Promise<any> {
    return await this._searchService.getMaterial(sp);
  }
}
