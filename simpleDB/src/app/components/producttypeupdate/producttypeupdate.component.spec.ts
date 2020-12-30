import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttypeupdateComponent } from './producttypeupdate.component';

describe('ProducttypeupdateComponent', () => {
  let component: ProducttypeupdateComponent;
  let fixture: ComponentFixture<ProducttypeupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducttypeupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducttypeupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
