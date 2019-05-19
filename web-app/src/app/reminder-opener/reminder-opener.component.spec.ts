import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderOpenerComponent } from './reminder-opener.component';

describe('ReminderOpenerComponent', () => {
  let component: ReminderOpenerComponent;
  let fixture: ComponentFixture<ReminderOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
