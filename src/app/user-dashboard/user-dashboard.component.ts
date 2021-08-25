import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../models/address.model';
import { Applicant } from '../models/applicant.model';
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

  isApplicantPresent = false;
  isAddressPresent = false;

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

    


    if (localStorage.getItem('UserName') == null && sessionStorage.getItem('UserName') == null) {
      this.router.navigate(['forbidden']);
    }
  }

}
