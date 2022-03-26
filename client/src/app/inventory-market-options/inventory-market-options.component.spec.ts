import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMarketOptionsComponent } from './inventory-market-options.component';

describe('InventoryMarketOptionsComponent', () => {
  let component: InventoryMarketOptionsComponent;
  let fixture: ComponentFixture<InventoryMarketOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMarketOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMarketOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
