import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSelectUserViewComponent } from './note-select-user-view.component';

describe('NoteSelectUserViewComponent', () => {
  let component: NoteSelectUserViewComponent;
  let fixture: ComponentFixture<NoteSelectUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteSelectUserViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSelectUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
