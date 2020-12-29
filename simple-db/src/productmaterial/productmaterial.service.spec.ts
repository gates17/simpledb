import { Test, TestingModule } from '@nestjs/testing';
import { ProductmaterialService } from './productmaterial.service';

describe('ProductmaterialService', () => {
  let service: ProductmaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductmaterialService],
    }).compile();

    service = module.get<ProductmaterialService>(ProductmaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
