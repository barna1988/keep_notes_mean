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

    const getNoteObserver = this.httpClient.get<Array<Note>>(environment.url_notes_create_get + userId, httpOptions);

    getNoteObserver.subscribe(response => {

      //this.notes = [];
      if (response['notes']) {
        console.log('adding notes', response['notes']);
        this.notes = response['notes'];
      }

      this.notesSubject.next(this.notes);
    },
      err => {
        console.log('Error in fetchNotesFromServer.', err);
      }
    );

  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {

    const token = this.authSvc.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    console.log('adding note : ', note);
    const addNoteObserver = this.httpClient.post<Note>(environment.url_notes_create_get + note.userId, note, httpOptions);

    return addNoteObserver.pipe(tap(response => {
      let addedNote = response['note'];
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    }))

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
      noteId : note.id
    }

    let addNoteObserver;

    if(isFav) {
      addNoteObserver = this.httpClient.put<Note>(environment.url_notes_add_favourite, data, httpOptions);
    } else {
      addNoteObserver = this.httpClient.put<Note>(environment.url_notes_remove_favourite, data, httpOptions);
    }
    
    return addNoteObserver.pipe(tap(response => {
      
      let addedNote = response['updateResult'];
      console.log('updated fav: ', addedNote);

      this.notes.forEach(element => {
        if(element.id === addedNote.id ) {
          element.isFavourite = addedNote.isFavourite;
        }
      });

      this.notesSubject.next(this.notes);
    }));
  }

  getNoteById(noteId): Note {
    console.log('notes in getNoteById :', this.notes);

    let notefound = this.notes.find((current) => current.id === noteId);

    console.log('returning note', notefound);
    return notefound;
  }


}
