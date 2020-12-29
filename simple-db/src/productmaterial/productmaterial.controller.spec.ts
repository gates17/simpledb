import { Test, TestingModule } from '@nestjs/testing';
import { ProductmaterialController } from './productmaterial.controller';

describe('ProductmaterialController', () => {
  let controller: ProductmaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductmaterialController],
    }).compile();

    controller = module.get<ProductmaterialController>(ProductmaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
