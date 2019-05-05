import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  @Input() note: Note;

  constructor(private routeSvc: RouterService) { }

  openNoteEditView() {
    const noteID = this.note.id;
    this.routeSvc.routeToEditNoteView(noteID);
  }


}
