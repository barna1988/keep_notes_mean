import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {

  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  isFavourite : boolean;

  constructor(private noteService: NotesService,
    private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    const noteId = this.data['noteId'];
    this.note = this.noteService.getNoteById(noteId);
    this.isFavourite = this.note.isFavourite;
  }

  onSave() {

    const editNoteObs = this.noteService.editNote(this.note);

    editNoteObs.subscribe(
      (response) => {
        this.dialogRef.close();
      },
      (err) => {
        if (err.error) {
          this.errMessage = err.error.message;
        } else {
          this.errMessage = err.message;
        }
      }
    );

  }
  
  onFavourite(isFav) {
    console.log('adding isFav : ', isFav);
    this.note.isFavourite = isFav;
    
    const addFavNoteObs = this.noteService.addToFavourite(this.note);
    
        addFavNoteObs.subscribe(
          (response) => {
            this.isFavourite = isFav;
          },
          (err) => {
            if (err.error) {
              this.errMessage = err.error.message;
            } else {
              this.errMessage = err.message;
            }
          }
        );
  }

}
