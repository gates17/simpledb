import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttypecreateComponent } from './producttypecreate.component';

describe('ProducttypecreateComponent', () => {
  let component: ProducttypecreateComponent;
  let fixture: ComponentFixture<ProducttypecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducttypecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducttypecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
