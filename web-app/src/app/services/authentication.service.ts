import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticateUser(data) {

    return this.httpClient.post('http://localhost:3000/api/v1/users/login', data)
      .pipe(map(response => response['token']));
  }

  registerUser(data) {

    this.httpClient.post('http://localhost:3000/api/v1/users/register', data);
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

  isUserAuthenticated(token): Promise<boolean> {

    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    const resp = this.httpClient.post('http://localhost:3000/api/v1/users/isAuthenticated', {}, httpOptions)
      .pipe(map(response => response['isAuthenticated']));

    return resp.toPromise();

  }


}
