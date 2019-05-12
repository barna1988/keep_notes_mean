import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-search-note',
  templateUrl: './search-note.component.html',
  styleUrls: ['./search-note.component.css']
})
export class SearchNoteComponent {

  searchtext : string;
  constructor(private notesvc : NotesService) { }

  searchNote() {
    if(this.searchtext) {
      this.notesvc.searchNotes(this.searchtext);
    } else {
      this.notesvc.fetchNotesFromServer();
    }
  }

}
