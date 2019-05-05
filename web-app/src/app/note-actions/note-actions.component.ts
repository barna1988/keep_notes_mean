import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note-actions',
  templateUrl: './note-actions.component.html',
  styleUrls: ['./note-actions.component.css']
})
export class NoteActionsComponent {

  constructor(private noteSvc: NotesService, private routerSvc : RouterService) { }

  deleteNotes() {
    let notes = this.getNotes();

    this.noteSvc.deleteNote(notes).subscribe(
      response => {
        console.log('resposne after delete', response);
      }, error => {
        console.log('error after delete', error);
      }
    )

  }

  shareNotes() {
    this.routerSvc.routeToNoteUserEditView('share');
  }

  groupNotes() {
    this.routerSvc.routeToNoteUserEditView('group');
  }

  getNotes() {
    let noteList = [];
    const noteObs = this.noteSvc.getNotes();

    noteObs.subscribe(
      (response) => {
        console.log('resp in NoteViewComponent nginit : ', response);
        noteList = response;
      },
      (error) => console.log(error.message)
    );

    return noteList;
  }

}
