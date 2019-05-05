import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSelectUserOpenerComponent } from './note-select-user-opener.component';

describe('NoteSelectUserOpenerComponent', () => {
  let component: NoteSelectUserOpenerComponent;
  let fixture: ComponentFixture<NoteSelectUserOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteSelectUserOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSelectUserOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
