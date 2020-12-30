import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),// [Validators.required,Validators.maxLength(255)]),
    password: new FormControl(''),// [ Validators.required, Validators.maxLength(255)]),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
  }

  gotoList() {
    this.router.navigate(['/dashboard']);
  }

  login() {
    this.loginService.post(this.loginForm.value).subscribe(result => {
      let jwt = result
      if("access_token" in jwt){
        localStorage.setItem('user', this.loginForm.value)
        sessionStorage.setItem('access_token', jwt['access_token'])
      }
      else{
        this.router.navigate(['/login'])
        alert('user not found')
      }
      this.gotoList();
    }, error => console.error(error));
  }

}
