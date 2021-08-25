import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../models/application.model';
import { Appointment } from '../models/appointment.model';
import { RtoOffice } from '../models/rto-office.model';
import { RtoOfficerService } from '../service/rto-officer.service';

@Component({
  selector: 'app-rto-officer',
  templateUrl: './rto-officer.component.html',
  styleUrls: ['./rto-officer.component.css']
})
export class RtoOfficerComponent implements OnInit {

  constructor(
    private router: Router,
    private rtoOfficerService : RtoOfficerService,
  ) { }

  val = localStorage.getItem('UserName');

  isLoggedIn: boolean = false;
  userName?: string;
  role?:string;

  rtoUsername !: string;

  isApplicationPresent = false;
  isAppointmentPresent = false;

  application : Set<Application> = new Set();
  appointment : Set<Appointment> = new Set();
  rtoId !: number;
  rtoOffice : RtoOffice = new RtoOffice();


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

    if(this.role!='rto'){
      this.router.navigate(['forbidden']);
    }

    this.rtoOfficerService.getRtoId(this.userName!).subscribe(
      data => {
        console.log(data);
        this.rtoId = data;
        console.log(this.rtoId);

        this.rtoOfficerService.viewApplications(this.rtoId).subscribe(
          data => {
            console.log(this.rtoId);
            this.application = data;
            console.log(this.application);
            if(this.application != null){
              this.isApplicationPresent = true;
              console.log("Applications List Fetched...");
            }
            else{
              this.isApplicationPresent = false;
              console.log("Applications List Could Not Be Fetched...");
            }
          }
        );
    
        this.rtoOfficerService.viewAppointments(this.rtoId).subscribe(
          data => {
            console.log(data);
            this.appointment = data;
            if(this.appointment != null){
              this.isAppointmentPresent = true;
              console.log("Appointments List Fetched...");
            }
            else{
              this.isAppointmentPresent = false;
              console.log("Appointments List Could Not Be Fetched...");
            }
          }
        )
      }
    );



    if (localStorage.getItem('UserName') == null && sessionStorage.getItem('UserName') == null) {
      this.router.navigate(['forbidden']);
    }

  }

}
