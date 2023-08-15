import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTypesComponent } from './price-types.component';

describe('PriceTypesComponent', () => {
  let component: PriceTypesComponent;
  let fixture: ComponentFixture<PriceTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
