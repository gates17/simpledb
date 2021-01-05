import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(
     private authService: LoginService,
     private router: Router
     ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(state.url)
    console.log(this.authService.isLoggedIn.value)
    //return this.checkLogin(state.url);
    return this.authService.isLoggedIn;
  }

checkLogin(url: string): true|UrlTree {
  console.log(this.authService.isLoggedIn.value )
  if (this.authService.isLoggedIn)
  { return true; }

  // Store the attempted URL for redirecting
  this.authService.redirectUrl = url;

  // Redirect to the login page
  return this.router.parseUrl('/login');
}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
