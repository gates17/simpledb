import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmaterialComponent } from './productmaterial.component';

describe('ProductmaterialComponent', () => {
  let component: ProductmaterialComponent;
  let fixture: ComponentFixture<ProductmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
