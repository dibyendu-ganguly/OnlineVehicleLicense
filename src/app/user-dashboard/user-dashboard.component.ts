import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../models/address.model';
import { Applicant } from '../models/applicant.model';
import { Application } from '../models/application.model';
import { Appointment } from '../models/appointment.model';
import { TemporaryAddress } from '../models/temporary-address.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private userService : UserService
  ) { }

  val = localStorage.getItem('UserName');

  applicant : Applicant = new Applicant();
  applicantPresentAddress: TemporaryAddress = new TemporaryAddress();
  applicantPermanentAddress: Address = new Address();
  applicantLLApplication : Application = new Application();
  applicantDLApplication : Application = new Application();
  applicantLLAppointment : Appointment = new Appointment();
  applicantDlAppointment : Appointment = new Appointment();

  isApplicantPresent = false;
  isAddressPresent = false;
  isLLPresent = false;
  isDLPresent = false;
  isLLAppointmentPresent = false;
  isDLAppointmentPresent = false;

  isLoggedIn: boolean = false;
  userName?: string;
  role?:string;

  ngOnInit(): void {

    // $("#menu-toggle").click(function (e) {
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    //   $("#sidebar-wrapper").css("display","block");
    //   $("#page-content-wrapper").css("opacity","0.5");
    //   $("#page-content-wrapper").css("z-index","-1");
    // });

    // $("#close-sidebar").click(function (e) {
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    //   $("#sidebar-wrapper").css("display","none");
    //   $("#page-content-wrapper").css("opacity","1");
    //   $("#page-content-wrapper").css("z-index","0");
    // });

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

    if(this.role!='user'){
      this.router.navigate(['forbidden']);
    }


    this.userService.viewApplicantProfile(this.userName!).subscribe(
      data => {
        console.log(data);
        this.applicant = data;
        console.log(this.applicant.firstName);
        console.log(this.applicant);
        if(this.applicant!=null){
          this.isApplicantPresent = true;
        } else{
          this.isApplicantPresent = false;
        }
      }
    );

    this.userService.viewPresentAddress(this.userName!).subscribe(
      data => {
        console.log(data);
        this.applicantPresentAddress = data;
        console.log(this.applicantPresentAddress);
        if(this.applicantPresentAddress!=null){
          this.isAddressPresent = true;
        } else{
          this.isAddressPresent = false;
        }
      }
    );

    this.userService.viewPermanentAddress(this.userName!).subscribe(
      data => {
        console.log(data);
        this.applicantPermanentAddress = data;
        console.log(this.applicantPermanentAddress);
      }
    );

    this.userService.getLLApplication(this.userName!).subscribe(
      data => {
        console.log(data);
        this.applicantLLApplication = data;
        console.log(this.applicantLLApplication);
        if(this.applicantLLApplication!=null){
          this.isLLPresent = true;
        } else {
          this.isLLPresent = false;
        }
      },
      error => {
        console.log(error);
      }
    );

    this.userService.getDLApplication(this.userName!).subscribe(
      data => {
        console.log(data);
        this.applicantDLApplication = data;
        console.log(this.applicantDLApplication);
        if(this.applicantDLApplication!=null){
          this.isDLPresent = true;
        } else {
          this.isDLPresent = false;
        }
      },
      error => {
        console.log(error);
      }
    );

    this.userService.getLLAppointment(this.userName!).subscribe(
      data => {
        console.log(data);
        this.applicantLLAppointment = data;
        console.log(this.applicantLLAppointment);
        if(this.applicantLLAppointment!=null){
          this.isLLAppointmentPresent = true;
        }
        else {
          this.isLLAppointmentPresent = false;
        }
      },
      error => {
        console.log(error);
      }

    );

    
    this.userService.getDLAppointment(this.userName!).subscribe(
      data => {
        console.log(data);
        this.applicantDlAppointment = data;
        console.log(this.applicantDlAppointment);
        if(this.applicantDlAppointment!=null){
          this.isDLAppointmentPresent = true;
        }
        else {
          this.isDLAppointmentPresent = false;
        }
      },
      error => {
        console.log(error);
      }
    );




    


    if (localStorage.getItem('UserName') == null && sessionStorage.getItem('UserName') == null) {
      this.router.navigate(['forbidden']);
    }
  }

}
