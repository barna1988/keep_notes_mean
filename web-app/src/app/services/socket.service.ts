import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { NotesService } from './notes.service';

@Injectable()
export class SocketService {

  socket: any;
  notificationSubject: BehaviorSubject<string>;
  reminderSubject: BehaviorSubject<string>;
  userName: string;
  notificationId: string;

  constructor(private authSvc: AuthenticationService,
    private noteSvc: NotesService) {

    this.socket = io(environment.url_notification_gateway);
    this.notificationSubject = new BehaviorSubject('');
    this.reminderSubject = new BehaviorSubject('');

    this.userName = authSvc.getLoginUserID();

    this.socket.emit('register', this.userName);

    this.socket.on('connect', () => {
      this.notificationSubject.next('Connected to the socket server');
    });

    this.socket.on('share-note', (shareInfo) => {

      this.notificationId = shareInfo.notificationID;

      if (shareInfo.note) {
        const title = shareInfo.note.title;
        this.notificationSubject.next('A note has been shared with you: ' + title);
        this.noteSvc.addNoteShared(shareInfo.note);
      }
    });

    this.socket.on('reminder', (shareInfo) => {

      this.notificationId = shareInfo.notificationID;

      if (shareInfo.note) {
        const title = shareInfo.note.title;
        this.reminderSubject.next('Reminder: ' + title);
      }
    });

    this.socket.on('disconnect', () => {
      this.notificationSubject.next('Disconnected from the socket server');
    });

  }

  showNotificationMessage(message : string) {
    this.notificationSubject.next(message);
  }

  getNotificationSubject(): BehaviorSubject<string> {
    return this.notificationSubject;
  }

  getReminderSubject(): BehaviorSubject<string> {
    return this.reminderSubject;
  }

  getNotificationId(): string {
    return this.notificationId;
  }

  disconnect(): void {
    this.socket.emit('deregister', this.userName);
  }

  enableNotification(response) {
    if (response.status === 200 || response.status === 201) {
      if(response.message) {
        this.showNotificationMessage(`Action Success! - ${response.message}`);
      } else {
        this.showNotificationMessage(`Action Success!`);
      }
    } else {
      this.showNotificationMessage(`Action Failed! Please retry.`);
    }
  }
}
