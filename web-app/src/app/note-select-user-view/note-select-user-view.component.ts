import { Component, OnInit, Inject } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-note-select-user-view',
  templateUrl: './note-select-user-view.component.html',
  styleUrls: ['./note-select-user-view.component.css']
})
export class NoteSelectUserViewComponent {

  userIDRegistered : Array<String>;
  groupsRegistered : Array<String>;
  
  userlist : Array<string>;
  groupList : Array<string>;

  loginUser : string;
  edittypes: string[] = ['View', 'Edit'];
  action : string;
  selectededittype : string;  

  isShare : boolean;
  isGroup : boolean;

  constructor(private noteService: NotesService,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<NoteSelectUserViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {

      this.userIDRegistered = this.getRegisteredUsers();
      this.groupsRegistered = this.getRegisteredGroups();

      this.loginUser = this.authService.getLoginUserID();
      this.action = this.data['action'];

      if(this.action === 'share') {
        this.isShare = true;
        this.isGroup = false;
      } else if(this.action === 'group') {
        this.isShare = false;
        this.isGroup = true;
      }
  }

  onSave() {

    if(this.isShare) {
      const shareObs = this.noteService.shareNotes(this.getSelectedNotes(), this.userlist, this.selectededittype);

      shareObs.subscribe(
        response => this.dialogRef.close(),
        error => console.log('error in share note', error)
      )
    } else if(this.isGroup) {
      const groupObs = this.noteService.groupNotes(this.getSelectedNotes(), this.groupList);

      groupObs.subscribe(
        response => this.dialogRef.close(),
        error => console.log('error in grouping note', error)
      )
    }
  }

  getRegisteredUsers() {
    let users = ['pri1', 'pri2', 'pri3']; //To be fetched - create service

    return users;
  }

  getRegisteredGroups() {//Add service in Users service
    let groups = ['group1', 'group2', 'group3']; //To be fetched - create service

    return groups;
  }

  getSelectedNotes() {//Add service in Notes Service
    let noteList = [];
    const noteObs = this.noteService.getNotes();

    noteObs.subscribe(
      (response) => {
        console.log('resp in NoteViewComponent nginit : ', response);
        noteList = response;
      },
      (error) => console.log(error.message)
    );

    let noteIDList = [];

    noteList.forEach(element => {
      if(element.checked) {
        noteIDList.push(element.id);
      }
    })

    return noteIDList;
  }

}
