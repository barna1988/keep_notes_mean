import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { MatSnackBar } from '@angular/material';
import { RouterService } from '../services/router.service';
import { ReminderService } from '../services/reminder.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public snackBar: MatSnackBar;

  constructor(private matSnackBar: MatSnackBar,
    private socketSvc: SocketService,
    private routerSvc: RouterService,
    private reminderSvc: ReminderService) {
    this.snackBar = matSnackBar;
  }

  ngOnInit() {

    setTimeout(() => {
      this.enableNotifications();
      this.enableRemindersWithSnooze();
    });

  }

  enableNotifications() {

    this.socketSvc.getNotificationSubject().subscribe(
      notification => {

        if (notification) {
          //Open notification alert -- changed to snackbar
          this.snackBar.open(notification, 'Done', {
            duration: 3000 //Close snackbar
          });
        }

      }, error => {
        console.log('error in enableNotifications. ', error);
      }
    );

  }

  enableRemindersWithSnooze() {

    this.socketSvc.getReminderSubject().subscribe(
      reminder => {

        if (reminder) {
          //Open reminder alert -- changed to snackbar + Snooze
          const snoozeSnackBar = this.snackBar.open(reminder, 'Snooze');
          snoozeSnackBar.onAction().subscribe(() => this.setSnoozeReminder());
        }

      }, error => {
        console.log('error in enableRemindersWithSnooze. ', error);
      }
    );

  }

  setSnoozeReminder() {
    this.reminderSvc.snoozeReminder(this.socketSvc.getNotificationId(), environment.reminder_snooze_minutes)
      .subscribe(
      response => {
        //Open snooze alert -- changed to snackbar
        this.snackBar.open(`Reminder snooze for ${environment.reminder_snooze_minutes} seconds`, 'Done', {
          duration: 3000 //Close snackbar
        });
      }, error => {
        console.log('error in setSnoozeReminder. ', error);
      }
      );
  }


}
