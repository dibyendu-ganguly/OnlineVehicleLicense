import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm !: FormGroup;

  userUsername !: FormControl;
  userPassword !: FormControl;
  userRememberMe !: FormControl;

  userLoginFormSubmitted = false;

  userResponseString?: String;
  userResponseStatus?: Number;

  adminLoginForm !: FormGroup;

  adminUsername !: FormControl;
  adminPassword !: FormControl;
  adminRememberMe !: FormControl;

  adminLoginFormSubmitted = false;
  
  
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem('UserName') != null || sessionStorage.getItem('UserName') != null) {
      if(localStorage.getItem('role') == 'user' || sessionStorage.getItem('role') == 'user'){
        this.router.navigate(['user']);
      }
      if(localStorage.getItem('role') == 'rto' || sessionStorage.getItem('role') == 'rto'){
        this.router.navigate(['rto-officer']);
      }
      if(localStorage.getItem('role') == 'admin' || sessionStorage.getItem('role') == 'admin'){
        this.router.navigate(['admin']);
      }
      
    }

    $("#show_hide_loginUser_password a").on('click', function (event) {
      event.preventDefault();
      if ($('#show_hide_loginUser_password input').attr("type") == "text") {
        $('#show_hide_loginUser_password input').attr('type', 'password');
        $('#show_hide_loginUser_password i').addClass("bi bi-eye-slash");
        $('#show_hide_loginUser_password i').removeClass("bi bi-eye");
      } else if ($('#show_hide_loginUser_password input').attr("type") == "password") {
        $('#show_hide_loginUser_password input').attr('type', 'text');
        $('#show_hide_loginUser_password i').removeClass("bi bi-eye-slash");
        $('#show_hide_loginUser_password i').addClass("bi bi-eye");
      }
    });

    $("#show_hide_loginAdmin_password a").on('click', function (event) {
      event.preventDefault();
      if ($('#show_hide_loginAdmin_password input').attr("type") == "text") {
        $('#show_hide_loginAdmin_password input').attr('type', 'password');
        $('#show_hide_loginAdmin_password i').addClass("bi bi-eye-slash");
        $('#show_hide_loginAdmin_password i').removeClass("bi bi-eye");
      } else if ($('#show_hide_loginAdmin_password input').attr("type") == "password") {
        $('#show_hide_loginAdmin_password input').attr('type', 'text');
        $('#show_hide_loginAdmin_password i').removeClass("bi bi-eye-slash");
        $('#show_hide_loginAdmin_password i').addClass("bi bi-eye");
      }
    });

    this.userUsername = new FormControl(null, [Validators.required]);
    this.userPassword = new FormControl(null, [Validators.required]);
    this.userRememberMe = new FormControl(null);

    this.userLoginForm = new FormGroup({
      'username': this.userUsername,
      'password': this.userPassword,
      'rememberMe': this.userRememberMe
    });

    this.adminUsername = new FormControl(null, [Validators.required]);
    this.adminPassword = new FormControl(null, [Validators.required]);
    this.adminRememberMe = new FormControl(null);

    this.adminLoginForm = new FormGroup({
      'adminUsername' : this.adminUsername,
      'adminPassword' : this.adminPassword,
      'adminRememberMe' : this.adminRememberMe
    });

  }

  userLogin(username: string, pass: string, rememberMe: boolean) {
    console.log("login called");
    console.log(rememberMe);
    this.userService.loginUser(username, pass).subscribe(
      data => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        console.log(data)
        console.log(data.body)
        console.log(data.status)
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.userResponseString = resJSON.body
        this.userResponseStatus = resJSON.status

        sessionStorage.setItem('UserName', username);
        sessionStorage.setItem('token', pass);
        sessionStorage.setItem('role','user');
        if (rememberMe) {

          localStorage.setItem('UserName', username);
          localStorage.setItem('token', pass);
          localStorage.setItem('role','user');
        }
        // } else {

        //   sessionStorage.setItem('Name', username);
        //   sessionStorage.setItem('token', pass);

        // }
        this.userLoginFormSubmitted = true;
        this.userLoginForm.reset();
        this.router.navigate(['user']);
        window.location.reload();
      },
      error => {
        console.log(error)
        let resSTR = JSON.stringify(error);
        let resJSON = JSON.parse(resSTR);
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.userResponseString = resJSON.error
        this.userResponseStatus = resJSON.status
        this.userLoginFormSubmitted = true;
        this.userLoginForm.reset();
      }
    )
    // console.log(this.userResponseStatus);
    // this.userLoginFormSubmitted = true;
    // this.userLoginForm.reset();
  }

  adminLogin(username: string, pass: string, rememberMe: boolean){
    this.adminLoginFormSubmitted = true;
    if(username=='admin' && pass=='admin'){
      sessionStorage.setItem('UserName', username);
        sessionStorage.setItem('token', pass);
        sessionStorage.setItem('role','admin');
        if (rememberMe) {

          localStorage.setItem('UserName', username);
          localStorage.setItem('token', pass);
          localStorage.setItem('role','admin');
        }
      this.router.navigate(['admin']);
      window.location.reload();
    }
  }

}
