import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent {

  nullGroup: Array<Note>;
  hasGroup: Array<Note>;

  constructor(private noteSvc: NotesService) {
    const noteObs = this.noteSvc.getNotes();

    noteObs.subscribe(
      (response) => {
        this.nullGroup = response.filter((note) => '' === note.groupName);
        this.hasGroup = response.filter((note) => '' !== note.groupName);
      },
      (error) => {
        console.log('Error in Getting All the notes');
      }
    );
  }


}
