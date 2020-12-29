import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmaterialdeleteComponent } from './productmaterialdelete.component';

describe('ProductmaterialdeleteComponent', () => {
  let component: ProductmaterialdeleteComponent;
  let fixture: ComponentFixture<ProductmaterialdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductmaterialdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmaterialdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
