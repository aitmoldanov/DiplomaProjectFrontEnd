import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://a3b0-2-133-79-240.ngrok.io/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'auth/**', {
      username,
      password
    }, {responseType: 'text'});
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'userCreate', {
      username,
      email,
      password
    }, httpOptions);
  }
}
