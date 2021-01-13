import { SearchService } from './search.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('search')
export class SearchController {
  constructor(private readonly _searchService: SearchService) {}

  @Get('cat/:type/:material')
  async getCat(@Param('type') type, @Param('material') material): Promise<any> {
    return await this._searchService.getCat(type, material);
  }

  @Get('product/:sp')
  async getProduct(@Param('sp') sp): Promise<any> {
    return await this._searchService.getProduct(sp);
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
