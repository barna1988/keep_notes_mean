import { Injectable } from '@angular/core';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  reminders: Array<any>;
  remindersSubject: BehaviorSubject<Array<any>>;
  userId: string;

  constructor(private httpClient: HttpClient, private authSvc: AuthenticationService) {
    this.reminders = [];
    this.remindersSubject = new BehaviorSubject(this.reminders);
    this.userId = this.authSvc.getLoginUserID();

      this.fetchAllRemindersFromServer();
  }

  getAuthHeader() {
    const token = this.authSvc.getBearerToken();
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    return httpOptions;
  }

  fetchAllRemindersFromServer() {
    let reminderObserver = this.httpClient.get<Array<any>>(`${environment.url_notification_reminder}?userId=${this.userId}`, this.getAuthHeader());

    reminderObserver.subscribe(response => {
      this.reminders = response;
      this.remindersSubject.next(this.reminders);
    }, error => console.log('Error in fetchAllRemindersFromServer.', error));

  }

  getReminderSubject(): BehaviorSubject<Array<any>> {
    return this.remindersSubject;
  }

  shareNoteWithReminderAt(notes: Note[], selectedUsers : string[], edittype : string): Observable<string> {

    const reminder = {
      remindAt: new Date(), //Sending reminder with current time
      notes: notes,
      userName: selectedUsers[0],
      self : false,
      edittype: edittype
    };

    let reminderObserver = this.httpClient.post<any>(`${environment.url_notification}?userId=${this.userId}`, reminder, this.getAuthHeader());

    return reminderObserver.pipe(tap(response => {
      this.reminders.push(response.notification);
      this.remindersSubject.next(this.reminders);
    },
      error => console.log('Error in setReminderAt.', error)
    ));
  }

  setReminderAt(remindAt: Date, note: Note): Observable<string> {

    const reminder = {
      remindAt: remindAt,
      note: note,
      userName: this.authSvc.getLoginUserID()
    };

    let reminderObserver = this.httpClient.post<any>(`${environment.url_notification_reminder}?userId=${this.userId}`, reminder, this.getAuthHeader());

    return reminderObserver.pipe(tap(response => {
      this.reminders.push(response.notification);
      this.remindersSubject.next(this.reminders);
    },
      error => console.log('Error in setReminderAt.', error)
    ));
  }

  snoozeReminder(reminderID: string, snoozeMinutes: number): Observable<any> {

    if (this.reminders.length === 0) {
      this.fetchAllRemindersFromServer();
    }
    const reminder = this.reminders.find(reminder => reminder.notificationID === reminderID);

    const dateRemindAt = new Date(reminder.remindAt);
    dateRemindAt.setMinutes(dateRemindAt.getMinutes() + snoozeMinutes);

    reminder.remindAt = dateRemindAt;

    let reminderObserver = this.httpClient.put<any>(`${environment.url_notification_reminder}/${reminderID}?userId=${this.userId}`, reminder, this.getAuthHeader())

    return reminderObserver.pipe(tap(response => {

      this.reminders = this.reminders.filter(reminder => reminder.notificationID !== reminderID);

      this.reminders.push(response);
      this.remindersSubject.next(this.reminders);
    },
      error => console.log('Error in snoozeReminder.', error)
    ));
  }

  dismissReminder(reminderID: string) {

    if (this.reminders.length === 0) {
      this.fetchAllRemindersFromServer();
    }
    const reminder = this.reminders.find(reminder => reminder.notificationID === reminderID);

    let reminderObserver = this.httpClient.delete<any>(`${environment.url_notification_reminder}/${reminder.notificationID}?userId=${this.userId}`, this.getAuthHeader());

    return reminderObserver.pipe(tap(response => {

      this.reminders = this.reminders.filter(reminder => reminder.notificationID !== reminderID);

      this.reminders.push(response);
      this.remindersSubject.next(this.reminders);
    },
      error => console.log('Error in snoozeReminder.', error)
    ));

  }

  getNotificationIDForNote(note : Note) {

    let reminderIDs = [];

    this.reminders.forEach(reminder => {
      let reminderNote = reminder.note;

      if(reminderNote && reminderNote.title === note.title && reminderNote.text === note.text) {
        reminderIDs.push(reminder.notificationID);
      }
    });

    return reminderIDs;

  }
}
