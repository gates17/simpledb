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
    this.router.navigate(['/productmaterial']);
  }

  login() {
    console.log(this.loginForm)
    this.loginService.post(this.loginForm).subscribe(result => { console.log(result)
      //this.gotoList();
    }, error => console.error(error));
  }

}
