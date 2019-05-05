import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-note-actions',
  templateUrl: './note-actions.component.html',
  styleUrls: ['./note-actions.component.css']
})
export class NoteActionsComponent {

  constructor(private noteSvc: NotesService, private authSvc: AuthenticationService) { }

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
