import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Applicant } from '../models/applicant.model';
import { Appointment } from '../models/appointment.model';
import { LicenseType } from '../models/license-type.enum';
import { TestResult } from '../models/test-result.enum';
import { RtoOfficeService } from '../service/rto-office.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {


  public applicationTypeList = LicenseType; 

  appointmentForm !: FormGroup;
  rtoOfficeVal !: FormControl;
  testDate !:FormControl;
  timeSlot !:FormControl;
  applicationType !: FormControl;


  appointmentFormResponseString?: String;
  appointmentResponseStatus?: Number;


  appointmentFormSubmitted = false;
  rtoOfficeMap ={};


  constructor(
    private router :Router,
    private rtoOfficeService : RtoOfficeService,
    private userService: UserService,
    public datePipe : DatePipe

  ) { }

  isLoggedIn : boolean = false;
  userName !: string;
  role ?: string;

  applicant : Applicant = new Applicant();

  ngOnInit(): void {

    if (localStorage.getItem('UserName') == null && sessionStorage.getItem('UserName') == null) {
      this.router.navigate(['forbidden']);
    } else {
      this.isLoggedIn = true;
      if (localStorage.getItem('UserName')?.toString() != null) {
        this.userName = localStorage.getItem('UserName')!.toString();
      }
      else if (sessionStorage.getItem('UserName')?.toString() != null) {
        this.userName = sessionStorage.getItem('UserName')!.toString();
      }
      if (localStorage.getItem('role')?.toString() != null) {
        this.role = localStorage.getItem('role')?.toString();
      }
      else if (sessionStorage.getItem('role')?.toString() != null) {
        this.role = sessionStorage.getItem('role')?.toString();
      }
    }

    if(this.role!='user'){
      this.router.navigate(['forbidden']);
    }

    this.rtoOfficeVal=new FormControl(null,[Validators.required]);
    this.testDate = new FormControl(null,[Validators.required]);
    this.timeSlot = new FormControl(null,[Validators.required]);
    this.applicationType=new FormControl(null,[Validators.required]);


    this.appointmentForm=new FormGroup(
      {
        'rtoOfficeVal':this.rtoOfficeVal,
        'testDate':this.testDate,
        'timeSlot':this.timeSlot,
        'applicationType':this.applicationType

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

  newAppointment : Appointment=new Appointment();

  addAppointment(){
    console.log("onsubmit Appointment called");
    console.log(this.appointmentForm);
    this.appointmentFormSubmitted=true;
    this.newAppointment.testDate = this.datePipe.transform(this.appointmentForm.controls['testDate'].value, 'dd-MM-yyyy')!;
    this.newAppointment.timeSlot = this.appointmentForm.controls['timeSlot'].value;
    this.newAppointment.testResult = TestResult.PENDING;
    var lType = this.appointmentForm.controls['applicationType'].value;
    var rtoId = this.appointmentForm.controls['rtoOfficeVal'].value;
    console.log(this.newAppointment);
    this.userService.addAppointment(this.newAppointment,this.userName+lType,rtoId).subscribe(
      data => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        console.log(data)
        console.log(data.body)
        console.log(data.status)
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.appointmentFormResponseString = resJSON.body
        this.appointmentResponseStatus = resJSON.status
      },
      error => {
        console.log(error)
        let resSTR = JSON.stringify(error);
        let resJSON = JSON.parse(resSTR);
        console.log(resJSON.error)
        console.log(resJSON.status)
        this.appointmentFormResponseString = resJSON.error
        this.appointmentResponseStatus = resJSON.status
      }
    );
  }
}
