import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticateUser(data) {

    return this.httpClient.post(environment.url_user_login, data)
      .pipe(map(response => response['token']));
  }

  registerUser(data) {

    return this.httpClient.post(environment.url_user_register, data)
      .pipe(map(response => response['userInfo']));
  }

  getAllUsers() {
    return this.httpClient.get(environment.url_user_getusers)
    .pipe(map(response => response['userInfo']));
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  removeBearerToken() {
    localStorage.removeItem('bearerToken');
  }

  setLoginUserID(userId) {
    localStorage.setItem('userId', userId);
  }

  getLoginUserID() {
    return localStorage.getItem('userId');
  }

  removeLoginUserID() {
    localStorage.removeItem('userId');
  }

  isUserAuthenticated(token): Promise<boolean> {

    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    const resp = this.httpClient.post(environment.url_user_auth, {}, httpOptions)
      .pipe(map(response => response['isAuthenticated']));

    return resp.toPromise();

  }

  logout() {
    this.removeBearerToken();
    this.removeLoginUserID();
  }

}
