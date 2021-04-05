import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageItemComponent } from './product-page-item.component';

describe('ProductPageItemComponent', () => {
  let component: ProductPageItemComponent;
  let fixture: ComponentFixture<ProductPageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
