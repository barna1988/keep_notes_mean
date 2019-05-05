import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email = new FormControl();
  username = new FormControl();
  password = new FormControl();

  submitMessage: string;

  constructor(private routerSvc: RouterService,
    private authSvc: AuthenticationService) { }

    registerSubmit() {
      const details = {
        'email': this.email.value,
        'username': this.username.value,
        'password': this.password.value,
      };

      if(!this.email.value || !this.username.value || !this.password.value ) {
        this.submitMessage = 'Incomplete details. Please provide the mandatory fields.';
      } else {

        const registerObserver = this.authSvc.registerUser(details);
        
        registerObserver.subscribe(
          response => {
            console.log('Resistration response: ', response);

            const username = response['userName'];
            this.submitMessage = `Registration success for user - ${username}`;

            setTimeout(() => {
              this.routerSvc.routeToLogin();
            }, 1000);
          },
          err => {
            if (err.error) {
              this.submitMessage = err.error.message;
            } else {
              this.submitMessage = err.message;
            }
          }
        )

      }

    }

}
