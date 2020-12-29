import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmaterialupdateComponent } from './productmaterialupdate.component';

describe('ProductmaterialupdateComponent', () => {
  let component: ProductmaterialupdateComponent;
  let fixture: ComponentFixture<ProductmaterialupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductmaterialupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmaterialupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
