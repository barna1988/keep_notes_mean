import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private routerSvc: RouterService,
    private authSvc: AuthenticationService,
    private socketSvc: SocketService) { }

  ngOnInit() {

    setTimeout(() => {

      let resp = {
        status: 200,
        message: 'Logout successful.'
      }
      this.socketSvc.enableNotification(resp);
      this.authSvc.logout();
      this.socketSvc.disconnect();
      this.routerSvc.routeToLogin();
    }, 1000);


  }

}
