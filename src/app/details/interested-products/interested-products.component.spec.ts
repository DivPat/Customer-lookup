import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedProductsComponent } from './interested-products.component';

describe('InterestedProductsComponent', () => {
  let component: InterestedProductsComponent;
  let fixture: ComponentFixture<InterestedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestedProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
