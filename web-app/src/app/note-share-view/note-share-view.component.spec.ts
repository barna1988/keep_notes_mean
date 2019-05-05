import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteShareViewComponent } from './note-share-view.component';

describe('NoteShareViewComponent', () => {
  let component: NoteShareViewComponent;
  let fixture: ComponentFixture<NoteShareViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteShareViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteShareViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
