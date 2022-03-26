import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldsmithingComponent } from './goldsmithing.component';

describe('GoldsmithingComponent', () => {
  let component: GoldsmithingComponent;
  let fixture: ComponentFixture<GoldsmithingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldsmithingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldsmithingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
