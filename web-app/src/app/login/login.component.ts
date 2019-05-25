import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = new FormControl();
  password = new FormControl();

  invalidLogin: Boolean;
  submitMessage: string;


  constructor(private routerSvc: RouterService,
    private authSvc: AuthenticationService,
    private socketSvc: SocketService
  ) { }

  loginSubmit() {
    const credentials = {
      'username': this.username.value,
      'password': this.password.value,
    };

    if (!this.username.value || !this.password.value) {
      this.submitMessage = 'Username and Passwrod required';
    } else {
      const authObs = this.authSvc.authenticateUser(credentials);

      authObs.subscribe(
        resp => {

          let notifyResp;
          if (resp) {
            this.authSvc.setBearerToken(resp);
            this.authSvc.setLoginUserID(credentials.username);
            this.invalidLogin = false;
            this.routerSvc.routeToDashboard();

            notifyResp = {
              status: 200,
              message: `Logged as ${credentials.username}`
            }

          } else {
            this.authSvc.removeBearerToken();
            this.authSvc.removeLoginUserID();
            this.submitMessage = 'Unauthorized';
            this.invalidLogin = true;

            notifyResp = {
              status: 401,
              message: this.submitMessage
            }
          }

          this.socketSvc.enableNotification(notifyResp);
        },
        err => {
          this.authSvc.removeBearerToken();
          this.authSvc.removeLoginUserID();
          if (err.error) {
            this.submitMessage = err.error.message;
          } else {
            this.submitMessage = err.message;
          }
          this.invalidLogin = true;
          this.socketSvc.showNotificationMessage(this.submitMessage);
        }
      );
    }
  }

  registration() {
    this.routerSvc.routeToRegister();
  }
}
