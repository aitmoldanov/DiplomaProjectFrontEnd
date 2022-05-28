import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Defence, Grade, Subject, Team, TeamMember, User} from '../Model/Team';
import {map} from 'rxjs/operators';

const API_URL = 'http://a3b0-2-133-79-240.ngrok.io/';
const headers = new HttpHeaders()
  .append('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private serviceUrl = 'https://dummyjson.com/users';
  constructor(private http: HttpClient) { }
  username = '';

  getDefences(): Observable<[Defence]> {
    return this.http.get<[Defence]>(API_URL + 'defences/teamId/1',  { responseType: 'json' });
  }

  getSubjects(): Observable<[Subject]> {
    return this.http.get<[Subject]>(API_URL + 'subjects/teamId/1',  { responseType: 'json' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'defences', { responseType: 'text' });
  }

  uploadList(jsonData: any): Observable<any> {
    return this.http.post(API_URL + '/uploadList', jsonData, { headers });
  }
  getTeams(): Observable<Team> {
    return this.http.get<Team>(API_URL + 'teams/1', { responseType: 'json' });
  }

  getTeamMembers(): Observable<[TeamMember]> {
    return this.http.get<[TeamMember]>(API_URL + 'teamMembers/team/1', { responseType: 'json' });
  }

  getUserByUsername(userName: string ): Observable<[User]> {
    return this.http.get<[User]>(API_URL + 'users/username?username=' + userName, { responseType: 'json' });
  }

  getUsers(): Observable<[Grade]> {
    return this.http
      .get(API_URL + 'userGrades')
      .pipe<[Grade]>(map((data: any) => data));
  }

  updateUser(userId: number, id: number, grade: string): Observable<User> {
    return this.http.put<User>(API_URL + 'userGrades/edit?grade=' + grade + '&id=' + id + '&userId=' + userId, { responseType: 'json' });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.serviceUrl}/add`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.serviceUrl}/${id}`);
  }

}
