import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { ReminderService } from '../services/reminder.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  @Input() note: Note;
  noteArray: Array<Note>;

  constructor(private routeSvc: RouterService,
    private noteSvc: NotesService,
    private reminderSvc: ReminderService,
    private socketSvc: SocketService) { }

  openNoteEditView() {
    const noteID = this.note.id;
    this.routeSvc.routeToEditNoteView(noteID);
  }

  toggleSelection() {
    this.note.checked = !this.note.checked;
    //console.log('checked : ', this.note.checked);
  }

  openNoteReminder() {
    const noteID = this.note.id;
    this.routeSvc.routeToNoteReminderView(noteID);
  }

  deleteNote() {
    this.noteArray = [];
    this.note.checked = true;
    this.noteArray.push(this.note);

    let notificationID = this.reminderSvc.getNotificationIDForNote(this.note);

    //Delete the note
    this.noteSvc.deleteNote(this.noteArray, false).subscribe(
      response => {
        console.log('resposne after delete', response);
        this.socketSvc.enableNotification(response);

        //Delete note reminder
        if (notificationID.length > 0) {
          notificationID.forEach(id => {
            this.reminderSvc.dismissReminder(id).subscribe(
              response => {
                console.log('resposne after delete', response);
                this.socketSvc.enableNotification(response);
              },
              error => {
                console.log('error after delete', error);
                this.socketSvc.enableNotification(response);
              }
            );
          })
        }
      },
      error => {
        console.log('error after delete', error);
        this.socketSvc.enableNotification(error);
      }
    );
  }

  shareNote() {
    this.note.checked = true;
    this.noteSvc.updateNotes(this.note);
    this.routeSvc.routeToNoteUserEditView('share');
  }

  groupNote() {
    this.note.checked = true;
    this.noteSvc.updateNotes(this.note);
    this.routeSvc.routeToNoteUserEditView('group');
  }

}
