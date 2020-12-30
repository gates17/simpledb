import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttypedeleteComponent } from './producttypedelete.component';

describe('ProducttypedeleteComponent', () => {
  let component: ProducttypedeleteComponent;
  let fixture: ComponentFixture<ProducttypedeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducttypedeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducttypedeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
