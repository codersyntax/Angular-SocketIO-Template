import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponsmithingComponent } from './weaponsmithing.component';

describe('WeaponsmithingComponent', () => {
  let component: WeaponsmithingComponent;
  let fixture: ComponentFixture<WeaponsmithingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponsmithingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponsmithingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
