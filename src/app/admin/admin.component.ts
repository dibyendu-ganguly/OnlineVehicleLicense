import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RtoOffice } from '../models/rto-office.model';
import { RtoOfficer } from '../models/rto-officer.model';
import { Users } from '../models/user.model';
import { RtoOfficeService } from '../service/rto-office.service';
import { RtoOfficerService } from '../service/rto-officer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  regForm !: FormGroup;
  rtoForm !: FormGroup;

  username !: FormControl;
  email !: FormControl;
  password !: FormControl;
  confirmPassword !: FormControl;
  rtoOfficeVal !: FormControl;

  rtoOffice !: FormControl;

  regFormSubmitted = false;
  rtoFormSubmitted = false;

  responseString?: String;
  responseStatus?: Number;

  constructor(
    private router: Router,
    private rtoOfficeService : RtoOfficeService,
    private rtoOfficerService : RtoOfficerService
  ) { }

  isLoggedIn: boolean = false;
  userName?: string;
  role?:string;

  rtoOfficeMap ={};

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
    this.rtoOfficeVal = new FormControl(null, [Validators.required]);

    this.rtoOffice = new FormControl(null, [Validators.required]);


    this.regForm = new FormGroup({
      'username': this.username,
      'password': this.password,
      'email': this.email,
      'confirmPassword': this.confirmPassword,
      'rtoOfficeVal' : this.rtoOfficeVal
    });

    this.rtoForm = new FormGroup(
      {
        'rtoOffice': this.rtoOffice,
      }
    );

    this.rtoOfficeService.getRtoMap().subscribe(
      data => {
        console.log(data);
        this.rtoOfficeMap = data;
        console.log(this.rtoOfficeMap);
      }
    );


  }

  newRTOofficer: RtoOfficer = new RtoOfficer();

  newRTOoffice : RtoOffice = new RtoOffice();

  addRtoOffice() {
    console.log("In Add RTO Office...");
    console.log(this.rtoForm);
    this.newRTOoffice.rtoName = this.rtoForm.controls['rtoOffice'].value;
    console.log(this.newRTOoffice);

    this.rtoOfficeService.addRtoOffice(this.newRTOoffice).subscribe(
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

        this.rtoFormSubmitted = true;
        this.rtoForm.reset(); 
        window.location.reload();      
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
  }

  refresh() {
    location.reload();
  }

  onSubmit() {
    console.log(this.regForm);
    this.newRTOofficer.email = this.regForm.controls['email'].value;
    this.newRTOofficer.username = this.regForm.controls['username'].value;
    this.newRTOofficer.password = this.regForm.controls['password'].value;
    console.log(this.newRTOofficer);
    //this.adminService.......to be added
    this.rtoOfficerService.addRtoOfficer(this.regForm.controls['rtoOfficeVal'].value, this.newRTOofficer).subscribe(
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

        this.regFormSubmitted = true;
        this.regForm.reset();       
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

  }

  //add RTO Officer function from rtoofficer service/admin service...below

}
