import { TestBed } from '@angular/core/testing';

import { ProductmaterialService } from './productmaterial.service';

describe('ProductmaterialService', () => {
  let service: ProductmaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductmaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
