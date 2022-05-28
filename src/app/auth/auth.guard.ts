import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../_services/auth.service';
import {LoginComponent} from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginComponent: LoginComponent, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.loginComponent.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.loginComponent.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/general']);
    return false;
  }

}
