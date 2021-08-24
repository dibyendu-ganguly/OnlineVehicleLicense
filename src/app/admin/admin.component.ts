import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RtoOfficer } from '../models/rto-officer.model';
import { Users } from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  regForm !: FormGroup;

  username !: FormControl;
  email !: FormControl;
  password !: FormControl;
  confirmPassword !: FormControl;

  regFormSubmitted = false;

  responseString?: String;
  responseStatus?: Number;

  constructor(
    private router: Router
  ) { }

  isLoggedIn: boolean = false;
  userName?: string;
  role?:string;

  ngOnInit(): void {

    if (localStorage.getItem('UserName') != null || sessionStorage.getItem('UserName') != null) {
      this.isLoggedIn = true;

      if (localStorage.getItem('UserName')?.toString() != null) {
        this.userName = localStorage.getItem('UserName')?.toString();
      }
      else if (sessionStorage.getItem('UserName')?.toString() != null) {
        this.userName = sessionStorage.getItem('UserName')?.toString();
      }

      if (localStorage.getItem('role')?.toString() != null) {
        this.role = localStorage.getItem('role')?.toString();
      }
      else if (sessionStorage.getItem('role')?.toString() != null) {
        this.role = sessionStorage.getItem('role')?.toString();
      }
    }

    if(this.role!='admin'){
      this.router.navigate(['forbidden']);
    }


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

  newRTOofficer: RtoOfficer = new RtoOfficer();


  onSubmit() {
    console.log(this.regForm);
    this.newRTOofficer.email = this.regForm.controls['email'].value;
    this.newRTOofficer.username = this.regForm.controls['username'].value;
    this.newRTOofficer.password = this.regForm.controls['password'].value;
    console.log(this.newRTOofficer);
    //this.adminService.......to be added
  }

  //add RTO Officer function from rtoofficer service/admin service...below

}
