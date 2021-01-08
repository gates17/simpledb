import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const baseURL = 'http://localhost:3000/auth/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // the actual JWT token
  //public token: string;

  // the token expiration date
  //public token_expires: Date;

  // the username of the logged in user
  //public email: string;

  redirectUrl: string;
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    ) { }

  post(data): Observable<any> {
    console.log(this.isLoggedIn)
    this.isLoggedIn.next(true);
    return this.httpClient.post(baseURL, data);
  }

  public logout() {
    /*this.token = null;
    this.token_expires = null;
    this.email = null;
    */
    this.isLoggedIn.next(false);
    this.router.navigate(['/']);
  }
}
