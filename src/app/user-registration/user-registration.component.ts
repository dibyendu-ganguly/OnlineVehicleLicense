import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../models/user.model';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  regForm !: FormGroup;

  username !: FormControl;
  email !: FormControl;
  password !: FormControl;
  confirmPassword !: FormControl;

  regFormSubmitted = false;

  responseString?: String;
  responseStatus?: Number;


  resSTR: any;
  resJSON: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }


  ngOnInit(): void {

    this.username = new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9\\._\\-]{6,20}$')]);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#%&+=])(?=\\S+$).{8,20}$')]);
    this.confirmPassword = new FormControl(null, [Validators.required]);

    this.regForm = new FormGroup({
      'username': this.username,
      'password': this.password,
      'email': this.email,
      'confirmPassword': this.confirmPassword
    });
  }

  newUser: Users = new Users();


  onSubmit() {
    console.log(this.regForm);
    this.newUser.email = this.regForm.controls['email'].value;
    this.newUser.username = this.regForm.controls['username'].value;
    this.newUser.password = this.regForm.controls['password'].value;
    console.log(this.newUser);
    this.registerUser(this.newUser);
  }

  registerUser(user: Users) {
    console.log("reg called");
    this.userService.registerUser(user).subscribe(
      data => {
        this.resSTR = JSON.stringify(data);
        this.resJSON = JSON.parse(this.resSTR);
        // console.log(data)
        // console.log(data.body)
        // console.log(data.status)
        // console.log(this.resJSON.body)
        // console.log(this.resJSON.status)
        this.responseString = this.resJSON.body
        this.responseStatus = this.resJSON.status

        // console.log(this.responseString)
      },
      error => {
        console.log(error)
        this.resSTR = error ? JSON.stringify(error) : this.resSTR;
        this.resJSON = error ? JSON.parse(this.resSTR) : this.resJSON;
        // console.log(this.resJSON.body)
        // console.log(this.resJSON.status)
        this.responseString = this.resJSON.body
        this.responseStatus = this.resJSON.status
      }
    );


    this.regFormSubmitted = true;
    this.regForm.reset();
  }



}
