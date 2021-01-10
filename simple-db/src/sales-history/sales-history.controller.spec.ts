import { Test, TestingModule } from '@nestjs/testing';
import { SalesHistoryController } from './sales-history.controller';

describe('SalesHistoryController', () => {
  let controller: SalesHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesHistoryController],
    }).compile();

    controller = module.get<SalesHistoryController>(SalesHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
