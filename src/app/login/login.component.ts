import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  userLoginFormSubmitted = false;

  userResponseString?: String;
  userResponseStatus?: Number;
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.userUsername = new FormControl(null,[Validators.required]);
    this.userPassword = new FormControl(null,[Validators.required]);

    this.userLoginForm = new FormGroup({
      'username' : this.userUsername,
      'pass' : this.userPassword
    });
    
  }

  userLogin(username:string,pass:string){
    console.log("login called");
    this.userService.loginUser(username,pass).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
    this.userLoginFormSubmitted = true;
    this.userLoginForm.reset();
  }

}
