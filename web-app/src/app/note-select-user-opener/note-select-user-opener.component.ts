import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { ActivatedRoute } from '@angular/router';
import { NoteSelectUserViewComponent } from '../note-select-user-view/note-select-user-view.component';

@Component({
  selector: 'app-note-select-user-opener',
  templateUrl: './note-select-user-opener.component.html',
  styleUrls: ['./note-select-user-opener.component.css']
})
export class NoteSelectUserOpenerComponent {

  constructor(private routerService: RouterService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {

      const action = this.activatedRoute.snapshot.paramMap.get('action');

      this.dialog.open(NoteSelectUserViewComponent, {
        data : {
          action : action
        }
      })
        .afterClosed().subscribe(result => this.routerService.routeBack());

  }

}
