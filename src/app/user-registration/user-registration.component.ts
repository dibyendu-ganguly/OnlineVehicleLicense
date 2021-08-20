import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../models/user.model';
import { UserService } from '../service/user.service';
import $ from "jquery";

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



  constructor(
    private router: Router,
    private userService: UserService
  ) { }


  ngOnInit(): void {


    $("#show_hide_regUser_password a").on('click', function (event) {
      event.preventDefault();
      if ($('#show_hide_regUser_password input').attr("type") == "text") {
        $('#show_hide_regUser_password input').attr('type', 'password');
        $('#show_hide_regUser_password i').addClass("bi bi-eye-slash");
        $('#show_hide_regUser_password i').removeClass("bi bi-eye");
      } else if ($('#show_hide_regUser_password input').attr("type") == "password") {
        $('#show_hide_regUser_password input').attr('type', 'text');
        $('#show_hide_regUser_password i').removeClass("bi bi-eye-slash");
        $('#show_hide_regUser_password i').addClass("bi bi-eye");
      }
    });



    $("#show_hide_regUser_confirm_password a").on('click', function (event) {
      event.preventDefault();
      if ($('#show_hide_regUser_confirm_password input').attr("type") == "text") {
        $('#show_hide_regUser_confirm_password input').attr('type', 'password');
        $('#show_hide_regUser_confirm_password i').addClass("bi bi-eye-slash");
        $('#show_hide_regUser_confirm_password i').removeClass("bi bi-eye");
      } else if ($('#show_hide_regUser_confirm_password input').attr("type") == "password") {
        $('#show_hide_regUser_confirm_password input').attr('type', 'text');
        $('#show_hide_regUser_confirm_password i').removeClass("bi bi-eye-slash");
        $('#show_hide_regUser_confirm_password i').addClass("bi bi-eye");
      }
    });


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
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        console.log(data)
        console.log(data.body)
        console.log(data.status)
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.responseString = resJSON.body
        this.responseStatus = resJSON.status

        console.log(this.responseString)
      },
      error => {
        console.log(error)
        let resSTR = JSON.stringify(error);
        let resJSON = JSON.parse(resSTR);
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.responseString = resJSON.body
        this.responseStatus = resJSON.status
      }
    );


    this.regFormSubmitted = true;
    this.regForm.reset();
  }



}
