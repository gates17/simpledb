import { Global, Module } from '@nestjs/common';
import { ProductmaterialController } from './productmaterial.controller';
import { ProductmaterialService } from './productmaterial.service';

@Global()
@Module({
  controllers: [ProductmaterialController],
  providers: [ProductmaterialService],
  exports: [ProductmaterialService],
})
export class ProductmaterialModule {}
