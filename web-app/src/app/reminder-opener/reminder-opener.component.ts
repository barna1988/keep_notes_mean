import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RouterService } from '../services/router.service';
import { ReminderViewComponent } from '../reminder-view/reminder-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reminder-opener',
  templateUrl: './reminder-opener.component.html',
  styleUrls: ['./reminder-opener.component.css']
})
export class ReminderOpenerComponent {

  constructor(private dialog: MatDialog,
    private routerService: RouterService,
    private activatedRoute: ActivatedRoute) {

    const noteId = this.activatedRoute.snapshot.paramMap.get('noteId');
    this.dialog.open(ReminderViewComponent, {
      data: {
        noteId: noteId
      }

    })
      .afterClosed().subscribe(
        response => this.routerService.routeBack()
      );

  }

}
