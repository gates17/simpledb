import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttypedetailComponent } from './producttypedetail.component';

describe('ProducttypedetailComponent', () => {
  let component: ProducttypedetailComponent;
  let fixture: ComponentFixture<ProducttypedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducttypedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducttypedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
