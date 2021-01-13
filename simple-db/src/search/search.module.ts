import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
