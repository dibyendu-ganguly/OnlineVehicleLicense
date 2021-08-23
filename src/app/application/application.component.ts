import { ApplicationInitStatus, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationStatus } from '../models/application-status.enum';
import { Application } from '../models/application.model';
import { LicenseType } from '../models/license-type.enum';
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
  paymentStatus !: FormControl;
  applicationStatus !: FormControl;
  applicationType !: FormControl;
  remarks !: FormControl;

  applicationFormSubmitted = false;

  applicationFormResponseString?: String;
  applictionResponseStatus?: Number;
  
  constructor(
    private router:Router,
   private applicationService: UserService
  ){}


  ngOnInit(): void {

    this.applicationDate=new FormControl(null,[Validators.required]);
    this.modeOfPayment=new FormControl(null,[Validators.required]);
    this.amountPaid=new FormControl(null,[Validators.required]);
    this.paymentStatus=new FormControl(null,[Validators.required]);
    this.applicationStatus=new FormControl(null,[Validators.required]);
    this.applicationType=new FormControl(null,[Validators.required]);
    this.remarks=new FormControl(null,[Validators.required]);

    this.applicationForm =new FormGroup(
      {
        'applicationDate': this.applicationDate,
        'modeOfPayment': this.modeOfPayment,
        'amountPaid': this.amountPaid,
        'paymentStatus':this.paymentStatus,
        'applicationStatus':this.applicationStatus,
        'applicationType':this.applicationType,
        'remarks':this.remarks
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
    this.newApplication.paymentStatus=this.applicationForm.controls['paymentStatus'].value;
    this.newApplication.applicationStatus=this.applicationForm.controls['applicationStatus'].value;
    this.newApplication.applicationType=this.applicationForm.controls['applicationType'].value;


    

  }

}

