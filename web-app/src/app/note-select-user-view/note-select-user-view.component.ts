import { Component, OnInit, Inject } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../services/authentication.service';
import { ReminderService } from '../services/reminder.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-note-select-user-view',
  templateUrl: './note-select-user-view.component.html',
  styleUrls: ['./note-select-user-view.component.css']
})
export class NoteSelectUserViewComponent {

  userIDRegistered: Array<String>;
  groupsRegistered: Array<String>;

  userlist: Array<string>;

  loginUser: string;
  edittypes: string[] = ['View', 'Edit'];
  action: string;
  selectededittype: string;
  selectedgroup: string;

  isShare: boolean;
  isGroup: boolean;

  errorMessage: string;

  constructor(private noteService: NotesService,
    private authService: AuthenticationService,
    private reminderSvc: ReminderService,
    private socketSvc: SocketService,
    private dialogRef: MatDialogRef<NoteSelectUserViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {

    this.getRegisteredUsers();
    this.groupsRegistered = this.getRegisteredGroups();

    this.loginUser = this.authService.getLoginUserID();
    this.action = this.data['action'];

    this.errorMessage = '';

    if (this.action === 'share') {
      this.isShare = true;
      this.isGroup = false;
    } else if (this.action === 'group') {
      this.isShare = false;
      this.isGroup = true;
    }
  }

  onSave() {

    this.errorMessage = '';

    if (this.isShare) {

      if (this.userlist && this.userlist.length > 0 && this.selectededittype) {
        const shareObs = this.noteService.shareNotes(this.getSelectedNoteIDs(), this.userlist, this.selectededittype);

        const reminderObs = this.reminderSvc.shareNoteWithReminderAt(this.getSelectedNotes(), this.userlist, this.selectededittype);

        shareObs.subscribe(
          response => {

            reminderObs.subscribe(resp => {
              // console.log('Note Shared with reminder');
              this.socketSvc.enableNotification(response);
              this.dialogRef.close();
            });
            
            
          },
          error => {
            console.log('error in share note', error);
            this.socketSvc.enableNotification(error);
          }
        );
      } else {
        this.errorMessage = 'Please select the mandatory fields';
        this.socketSvc.showNotificationMessage(this.errorMessage);
      }


    } else if (this.isGroup) {

      if (this.selectedgroup && this.getSelectedNoteIDs().length !== 0) {
        const groupObs = this.noteService.groupNotes(this.getSelectedNoteIDs(), this.selectedgroup);

        groupObs.subscribe(
          response => {
            // console.log('Note Shared with reminder');
            this.socketSvc.enableNotification(response);
            this.dialogRef.close();
          },
          error => {
            console.log('error in grouping note', error);
            this.socketSvc.enableNotification(error);
          }
        );
      } else {
        this.errorMessage = 'Please select the mandatory fields';
        this.socketSvc.showNotificationMessage(this.errorMessage);
      }

    }
  }

  getRegisteredUsers() {
    let getUserObserver = this.authService.getAllUsers();

    getUserObserver.subscribe(
      response => this.userIDRegistered = response.filter(user => user !== this.authService.getLoginUserID()),
      error => console.log(error.message)
    );
  }

  getRegisteredGroups() {//Add service in Users service
    let groups = [];

    const noteObs = this.noteService.getNotes();

    noteObs.subscribe(
      response => response.map(note => {
        
        let groupExists = groups.find(element => element === note.groupName);
        
        if(!groupExists) {
          groups.push(note.groupName);
        }
      }),
      error => console.log(error.message)
    );

    return groups;
  }

  getSelectedNoteIDs() {//Add service in Notes Service
    let noteList = [];
    const noteObs = this.noteService.getNotes();

    noteObs.subscribe(
      response => noteList = response,
      error => console.log(error.message)
    );

    let noteIDList = [];

    noteList.forEach(element => {
      if (element.checked) {
        noteIDList.push(element.id);
      }
    })

    return noteIDList;
  }

  getSelectedNotes() {//Add service in Notes Service
    let noteList = [];
    const noteObs = this.noteService.getNotes();

    noteObs.subscribe(
      response => noteList = response,
      error => console.log(error.message)
    );

    let selectedNotes = [];
    
    noteList.forEach(element => {
      if(element.checked) {
        selectedNotes.push(element);
      }
    });

    return selectedNotes;
  }

  onCancel() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 1000);
  }

}
