import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmaterialcreateComponent } from './productmaterialcreate.component';

describe('ProductmaterialcreateComponent', () => {
  let component: ProductmaterialcreateComponent;
  let fixture: ComponentFixture<ProductmaterialcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductmaterialcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmaterialcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
