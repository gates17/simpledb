import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmaterialdetailComponent } from './productmaterialdetail.component';

describe('ProductmaterialdetailComponent', () => {
  let component: ProductmaterialdetailComponent;
  let fixture: ComponentFixture<ProductmaterialdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductmaterialdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmaterialdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
