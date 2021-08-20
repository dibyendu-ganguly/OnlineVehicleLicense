import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../models/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  username !: FormControl;
  password !: FormControl;

  loginFormSubmitted = false;
  invalidLogin = false;
  isLoggedIn = false;
  errorMessage = 'Invalid Credentials';
  successMessage = '';

  responseString?: String;
  responseStatus?: Number;

  resSTR: any;
  resJSON: any;
  
  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.username = new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9\\._\\-]{6,20}$')]);
    this.password = new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#%&+=])(?=\\S+$).{8,20}$')]);

    this.loginForm = new FormGroup({
      'username': this.username,
      'password': this.password
    });
  }

  exisitngUser = new Users();

  onSubmit(): void {
    console.log(this.loginForm);
    this.exisitngUser.username = this.loginForm.controls['username'].value;
    this.exisitngUser.password = this.loginForm.controls['password'].value;
    console.log(this.exisitngUser);
    this.loginUser(this.exisitngUser);
  }

  loginUser(user: Users): void {
    console.log("Login Called...");
    this.userService.loginUser(user.username, user.password).subscribe(
      data => {
        this.resSTR = JSON.stringify(data);
        this.resJSON = JSON.parse(this.resSTR);
        console.log(data)
        console.log(data.body)
        console.log(data.status)
        console.log(this.resJSON.body)
        console.log(this.resJSON.status)
        this.responseString = this.resJSON.body
        this.responseStatus = this.resJSON.status
        this.invalidLogin = false;
        this.isLoggedIn = true;
        this.successMessage = 'Successfully Logged In'
        this.router.navigate([''])

        console.log(this.responseString)
      },
      error => {
        console.log(error)
        this.resSTR = error ? JSON.stringify(error) : this.resSTR;
        this.resJSON = error ? JSON.parse(this.resSTR) : this.resJSON;
        console.log(this.resJSON.body)
        console.log(this.resJSON.status)
        this.responseString = this.resJSON.body
        this.responseStatus = this.resJSON.status

        this.invalidLogin = true;
        this.isLoggedIn = false;
      }
    );

    this.loginFormSubmitted = true;
    //this.loginForm.reset();
  }
}
