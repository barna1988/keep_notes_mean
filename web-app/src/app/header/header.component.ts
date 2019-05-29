import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isNoteView = true;  
  isGroupView = false;
  constructor(private routerSvc: RouterService) { }

  switchToListView() {
    this.isNoteView = false;
    this.isGroupView = false;
    this.routerSvc.routeToListView();
  }

  switchToNoteView() {
    this.isNoteView = true;
    this.isGroupView = false;
    this.routerSvc.routeToNoteView();
  }

  switchToGroupView() {
    this.isNoteView = false;
    this.isGroupView = true;
    this.routerSvc.routeToGroupView();
  }

  switchToLogout() {
    this.isNoteView = false;
    this.isGroupView = false;
    this.routerSvc.routeToLogout();
  }

}
