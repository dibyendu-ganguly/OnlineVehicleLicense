import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from '../models/appointment.model';
import { LicenseType } from '../models/license-type.enum';
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


  appointmentFormSubmitted = false;
  rtoOfficeMap ={};


  constructor(
    private router :Router,
    private rtoOfficeService : RtoOfficeService,
    private userService: UserService

  ) { }

  ngOnInit(): void {

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
    this.newAppointment.testDate=this.appointmentForm.controls['testDate'].value;
    this.newAppointment.timeSlot=this.appointmentForm.controls['timeSlot'].value;
    var rtoOffice = this.appointmentForm.controls['rtoOfficeVal'].value;

    this.userService.addAppointment()
  }
}
