import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_NAME = 'user-name';
const DEFENCE_TYPE = 'defence-type';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public setUserName(userName: any): void {
    window.sessionStorage.setItem(USER_NAME, userName);
  }

  public setUser(user: any): void {
    window.sessionStorage.setItem(USER, user);
  }

  public getUserName(): any {
    return window.sessionStorage.getItem(USER_NAME);
  }

  public setDefenceType(defence: any): void {
    window.sessionStorage.setItem(DEFENCE_TYPE, defence);
  }

  public getDefenceType(): any {
    return window.sessionStorage.getItem(DEFENCE_TYPE);
  }
}
