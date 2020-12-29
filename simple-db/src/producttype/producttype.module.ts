import { Global, Module } from '@nestjs/common';
import { ProducttypeController } from './producttype.controller';
import { ProducttypeService } from './producttype.service';

@Global()
@Module({
  controllers: [ProducttypeController],
  providers: [ProducttypeService],
  exports: [ProducttypeService],
})
export class ProducttypeModule {}
