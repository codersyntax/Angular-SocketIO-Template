import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotanyComponent } from './botany.component';

describe('BotanyComponent', () => {
  let component: BotanyComponent;
  let fixture: ComponentFixture<BotanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
