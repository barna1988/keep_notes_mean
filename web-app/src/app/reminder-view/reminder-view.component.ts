import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotesService } from '../services/notes.service';
import { ReminderService } from '../services/reminder.service';
import { Note } from '../note';
import { FormControl } from '@angular/forms';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-reminder-view',
  templateUrl: './reminder-view.component.html',
  styleUrls: ['./reminder-view.component.css']
})
export class ReminderViewComponent implements OnInit {

  listOfHours: Array<Number>;
  listOfMinutes: Array<Number>;
  note: Note;
  selectedHour: number;
  selectedMinute: number;

  dateSelector: any;
  today: Date;
  errorMsg: string;

  showReminderList: boolean;
  reminderListPending: Array<any>;
  reminderListCompleted: Array<any>;

  constructor(private dialogRef: MatDialogRef<ReminderViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteSvc: NotesService,
    private reminderSvc: ReminderService,
    private socketSvc : SocketService) {

    this.listOfHours = [];
    this.listOfMinutes = [];

    this.showReminderList = false;
    this.reminderListPending = [];
    this.reminderListCompleted = [];

  }

  ngOnInit() {

    for (let i = 0; i < 24; i++) {
      this.listOfHours.push(i);
    }
    for (let i = 0; i < 60; i++) {
      this.listOfMinutes.push(i);
    }
    this.note = this.noteSvc.getNoteById(this.data.noteId);

    this.dateSelector = new FormControl(new Date());
    this.today = new Date();

  }

  saveReminder() {
    const selectedDate = this.dateSelector.value as Date;
    selectedDate.setMinutes(this.selectedMinute);
    selectedDate.setHours(this.selectedHour);
    //selectedDate.setSeconds(0);
    
    let reminderObserver = this.reminderSvc.setReminderAt(selectedDate, this.note);

    reminderObserver.subscribe(
      response => {
        this.dialogRef.close();
        this.socketSvc.enableNotification(response);
      },
      error => {
        this.errorMsg = error.message;
        this.socketSvc.enableNotification(error);
      }
    );

  }

  cancel() {

    setTimeout(() => {
      this.showReminderList = false;
      this.dialogRef.close();
    }, 500);
  }

  viewAllReminders(toggleFlag : boolean) {
    
    this.reminderListCompleted = [];
      this.reminderListPending = [];
      
    if(toggleFlag) {
      this.showReminderList = !this.showReminderList;
    }

    if (this.showReminderList) {
      let reminderObserver = this.reminderSvc.getReminderSubject();

      reminderObserver.subscribe(
        response => {

          if (response) {
            response.forEach(reminder => {

              if (reminder && reminder.note && reminder.note.title === this.note.title && reminder.note.text === this.note.text) {
                if (reminder.isSent) {
                  this.reminderListCompleted.push(reminder);
                } else {
                  this.reminderListPending.push(reminder);
                }
              }

            });

            if(this.reminderListPending.length === 0 && this.reminderListCompleted.length === 0) {
              this.showReminderList = false;
              this.socketSvc.showNotificationMessage('No reminder present for the Note');
            }
          }

        }
      );
    } else {
      this.reminderListCompleted = [];
      this.reminderListPending = [];
    }

  }


  deleteNote(reminder : any) {
    
    let reminderID = reminder.notificationID;

    //Delete the note
    this.reminderSvc.dismissReminder(reminderID).subscribe(
      response => {
        console.log('resposne after delete', response);
        this.viewAllReminders(false);
        this.socketSvc.enableNotification(response);
      },
      error => {
        console.log('error after delete', error);
        this.socketSvc.enableNotification(error);
      }
    );
  }

}
