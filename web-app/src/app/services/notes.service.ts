import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { tap } from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private httpClient: HttpClient, private authSvc: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }

  fetchNotesFromServer() {

    const token = this.authSvc.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    const userId = this.authSvc.getLoginUserID();

    const getNoteObserver = this.httpClient.get<Array<Note>>(`${environment.url_notes_create_get}?userId=${userId}`, httpOptions);

    getNoteObserver.subscribe(response => {

      //this.notes = [];
      if (response['notes']) {
        this.notes = response['notes'];

        this.notes.forEach(note => {
          note.checked = false;
        });
      }

      this.notesSubject.next(this.notes);
    },
      err => console.log('Error in fetchNotesFromServer.', err)
    );

  }

  searchNotes(searchText: string) {
    const token = this.authSvc.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    const userId = this.authSvc.getLoginUserID();

    const getNoteObserver = this.httpClient.get<Array<Note>>(`${environment.url_notes_create_get}?userId=${userId}&title=${searchText}`, httpOptions);

    getNoteObserver.subscribe(response => {

      this.notes = [];
      if (response['notes']) {
        this.notes = response['notes'];

        this.notes.forEach(note => {
          note.checked = false;
        });
      }

      this.notesSubject.next(this.notes);
    }, err => {
      console.log('Error in searchNotes.', err);
      this.notes = [];
      this.notesSubject.next(this.notes);
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {

    const token = this.authSvc.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    const addNoteObserver = this.httpClient.post<Note>(`${environment.url_notes_create_get}?userId=${note.userId}`, note, httpOptions);

    return addNoteObserver.pipe(tap(response => {
      let addedNote = response['note'];
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    }))

  }

  deleteNote(noteList: Array<Note>, isMultiple: boolean) {

    const token = this.authSvc.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    const noteToDelete = [];
    noteList.forEach(element => {
      if (element.checked) {
        noteToDelete.push(element.id)
      }
    });

    let requestdata = {
      noteId: noteToDelete
    }

    const deleteNoteObserver = this.httpClient.post(environment.url_notes_delete, requestdata, httpOptions);

    return deleteNoteObserver.pipe(tap(response => {
      let status = response['status'];

      if (status === 200) {
        if (isMultiple && noteList.length > 1) {
          this.notes = noteList.filter(element => !element.checked);
        } else if (noteList.length === 1) {
          let note = noteList[0];
          this.notes = this.notes.filter(element => element.id !== note.id);
        }
      }

      this.notesSubject.next(this.notes);
    }));

  }

  editNote(note: Note): Observable<Note> {
    const token = this.authSvc.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    const addNoteObserver = this.httpClient.put<Note>(environment.url_notes_update + note.id, note, httpOptions);

    return addNoteObserver.pipe(tap(addedNote => {
      this.notesSubject.next(this.notes);
    }))
  }

  addToFavourite(note: Note): Observable<Note> {
    const token = this.authSvc.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    const isFav = note.isFavourite;

    const data = {
      noteId: note.id
    }

    let addNoteObserver;

    if (isFav) {
      addNoteObserver = this.httpClient.put<Note>(environment.url_notes_add_favourite, data, httpOptions);
    } else {
      addNoteObserver = this.httpClient.put<Note>(environment.url_notes_remove_favourite, data, httpOptions);
    }

    return addNoteObserver.pipe(tap(response => {

      let addedNote = response['data'];
      //console.log('updated fav: ', addedNote);

      this.notes.forEach(element => {
        if (element.id === addedNote.id) {
          element.isFavourite = addedNote.isFavourite;
        }
      });

      this.notesSubject.next(this.notes);
    }));
  }

  shareNotes(selectedNoteIDs: Array<string>, selectedUsers: Array<string>, access: string) {
    const token = this.authSvc.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    const data = {
      noteId: selectedNoteIDs,
      sharedTo: []
    }

    selectedUsers.forEach(userid => {
      let shared = {
        userID: userid,
        access: access
      };

      data.sharedTo.push(shared);
    })

    let shareNoteObserver = this.httpClient.put<Note>(environment.url_notes_share, data, httpOptions);

    return shareNoteObserver.pipe(tap(response => {

      let addedNote = response['data'];
      //console.log('updated fav: ', addedNote);

      this.notes.forEach(element => {
        if (element.checked) {
          element.sharedTo.concat(data.sharedTo);
        }
      });

      this.notesSubject.next(this.notes);

    }));
  }

  groupNotes(selectedNoteIDs: Array<string>, groupName: string) {
    const token = this.authSvc.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    const data = {
      noteId: selectedNoteIDs,
      groupName: groupName
    }

    let groupNoteObserver = this.httpClient.put<Note>(environment.url_notes_addGroup, data, httpOptions);

    return groupNoteObserver.pipe(tap(response => {

      let addedNote = response['data'];
      //console.log('updated fav: ', addedNote);

      this.notes.forEach(element => {
        if (element.checked) {
          element.groupName = groupName;
        }
      });

      this.notesSubject.next(this.notes);

    }));
  }

  getNoteById(noteId): Note {
    //console.log('notes in getNoteById :', this.notes);

    let notefound = this.notes.find((current) => current.id === noteId);

    //console.log('returning note', notefound);
    return notefound;
  }

  addNoteShared(note: Note) {
    this.notes.push(note);
    this.notesSubject.next(this.notes);
  }

  updateNotes(note: Note) {

    this.notes.map(n => {
      if (n.id === note.id) {
        n = note;
      }
    });

    this.notesSubject.next(this.notes);
  }

}
