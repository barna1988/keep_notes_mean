import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteShareOpenerComponent } from './note-share-opener.component';

describe('NoteShareOpenerComponent', () => {
  let component: NoteShareOpenerComponent;
  let fixture: ComponentFixture<NoteShareOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteShareOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteShareOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
