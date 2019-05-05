import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private routerSvc: RouterService,
    private authSvc : AuthenticationService) { }

  ngOnInit() {

    setTimeout(() => {
      this.authSvc.logout();
      this.routerSvc.routeToLogin();
    }, 1000);

    
  }

}
