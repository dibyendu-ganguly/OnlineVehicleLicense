import { DatePipe } from '@angular/common';
import { ApplicationInitStatus, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationStatus } from '../models/application-status.enum';
import { Application } from '../models/application.model';
import { LicenseType } from '../models/license-type.enum';
import { RtoOfficeService } from '../service/rto-office.service';
import { UserService } from '../service/user.service';
//import { ApplicationSe
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  public applicationStatusList= ApplicationStatus;

  public applicationTypeList=LicenseType; 

  applicationForm !: FormGroup;


  applicationDate !: FormControl;
  modeOfPayment !: FormControl;
  amountPaid !: FormControl;
  // paymentStatus !: FormControl;
  // applicationStatus !: FormControl;
  applicationType !: FormControl;
  // remarks !: FormControl;
  rtoOfficeVal !: FormControl;

  applicationFormSubmitted = false;

  applicationFormResponseString?: String;
  applicationResponseStatus?: Number;
  
  constructor(
    private router:Router,
   private userService: UserService,
   private rtoOfficeService : RtoOfficeService,
   public datePipe : DatePipe
  ){}

  rtoOfficeMap ={};
  paymentModes = ['UPI','Net Banking','Credit Card', 'Debit Card'];

  today = this.datePipe.transform(new Date().toLocaleDateString(), 'dd-MM-yyyy');

  isLoggedIn : boolean = false;
  userName !: string;
  role ?: string;



  isPresent = false;
  
  ngOnInit(): void {
    console.log(this.today);

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

    this.applicationDate=new FormControl({value: this.today, disabled: false});
    this.modeOfPayment=new FormControl(null,[Validators.required]);
    this.amountPaid=new FormControl(null,[Validators.required]);
    // this.paymentStatus=new FormControl(null,[Validators.required]);
    // this.applicationStatus=new FormControl(null,[Validators.required]);
    this.applicationType=new FormControl(null,[Validators.required]);
    // this.remarks=new FormControl(null);
    this.rtoOfficeVal = new FormControl(null, [Validators.required]);
    ;
    console.log( this.datePipe.transform(new Date().toLocaleDateString(), 'dd-MM-yyyy'));

    this.applicationForm =new FormGroup(
      {
        'applicationDate': this.applicationDate,
        'modeOfPayment': this.modeOfPayment,
        'amountPaid': this.amountPaid,
        'applicationType':this.applicationType,
        // 'remarks':this.remarks,
        'rtoOfficeVal' : this.rtoOfficeVal
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
  newApplication :Application =new Application();
  addApplication(){
    console.log("onsubmit Application called");
    console.log(this.applicationForm);
    this.applicationFormSubmitted=true;
    this.newApplication.applicationDate=this.applicationForm.controls['applicationDate'].value;
    this.newApplication.modeOfPayment=this.applicationForm.controls['modeOfPayment'].value;
    this.newApplication.amountPaid=this.applicationForm.controls['amountPaid'].value;
    this.newApplication.applicationType=this.applicationForm.controls['applicationType'].value;
    var rtoOffice = this.applicationForm.controls['rtoOfficeVal'].value;

    this.userService.addApplication(this.userName, this.newApplication, rtoOffice).subscribe(
      data => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        console.log(data)
        console.log(data.body)
        console.log(data.status)
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.applicationFormResponseString = resJSON.body
        this.applicationResponseStatus = resJSON.status 

        console.log(this.applicationFormResponseString)
        window.location.reload();
      },
      error => {
        console.log(error)
        let resSTR = JSON.stringify(error);
        let resJSON = JSON.parse(resSTR);
        console.log(resJSON.error)
        console.log(resJSON.status)
        this.applicationFormResponseString = resJSON.error
        this.applicationResponseStatus = resJSON.status
      }
    )
     this.applicationFormSubmitted = true;
  }

}

