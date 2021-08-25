import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data, error } from 'jquery';
import { Documents } from '../models/document.model';
<<<<<<< HEAD
=======
import { LicenseType } from '../models/license-type.enum';
>>>>>>> 5ced0f0e5a732b288b50e72bc631aeb34c7de595
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

<<<<<<< HEAD
=======
  public applicationTypeList = LicenseType; 

>>>>>>> 5ced0f0e5a732b288b50e72bc631aeb34c7de595
  documentForm !: FormGroup;
  photo !: FormControl;
  idProof !: FormControl;
  addressProof !:FormControl;
<<<<<<< HEAD
=======
  applicationType !: FormControl;
>>>>>>> 5ced0f0e5a732b288b50e72bc631aeb34c7de595

  documentsSubmitted =false;

  documentFormResponseString?: String;
  documentResponseStatus?: Number;
  
  constructor(
    private router: Router,
    private userService: UserService,

  ) {
    
   }
   applicationNumber : string="";
   document :Documents =new Documents();
   isPresent=false;

  ngOnInit(): void {
    this.photo=new FormControl(null,[Validators.required]);
    this.idProof=new FormControl(null,[Validators.required]);
    this.addressProof =new FormControl(null,[Validators.required]);
<<<<<<< HEAD
=======
    this.applicationType=new FormControl(null,[Validators.required]);
>>>>>>> 5ced0f0e5a732b288b50e72bc631aeb34c7de595


    this.documentForm=new FormGroup(
      {
        'photo':this.photo,
        'idProof':this.idProof,
<<<<<<< HEAD
        'addressProof':this.addressProof
=======
        'addressProof':this.addressProof,
        'applicationType':this.applicationType,
>>>>>>> 5ced0f0e5a732b288b50e72bc631aeb34c7de595
      }
    )
  }

  newDocuments : Documents=new Documents();

  addDocument()
  {
    console.log("onSubmit Document called");

    this.documentsSubmitted=true;
    this.newDocuments.photo= this.documentForm.controls['photo'].value;
    this.newDocuments.idProof=this.documentForm.controls['idProof'].value;
    this.newDocuments.addressProof=this.documentForm.controls['addressProof'].value;


<<<<<<< HEAD
    this.userService.addDocumentApplication(this.applicationNumber,this.newDocuments).subscribe(
      data => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        console.log(data)
        console.log(data.body)
        console.log(data.status)
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.documentFormResponseString = resJSON.body
        this.documentResponseStatus = resJSON.status

        console.log(this.documentFormResponseString)
        window.location.reload();
      },
      error => {
        console.log(error)
        let resSTR = JSON.stringify(error);
        let resJSON = JSON.parse(resSTR);
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.documentFormResponseString = resJSON.body
        this.documentResponseStatus = resJSON.status
      }
    );
=======
    // this.userService.addDocumentApplication(this.applicationNumber,this.newDocuments).subscribe(
    //   data => {
    //     let resSTR = JSON.stringify(data);
    //     let resJSON = JSON.parse(resSTR);
    //     console.log(data)
    //     console.log(data.body)
    //     console.log(data.status)
    //     console.log(resJSON.body)
    //     console.log(resJSON.status)
    //     this.documentFormResponseString = resJSON.body
    //     this.documentResponseStatus = resJSON.status

    //     console.log(this.documentFormResponseString)
    //     window.location.reload();
    //   },
    //   error => {
    //     console.log(error)
    //     let resSTR = JSON.stringify(error);
    //     let resJSON = JSON.parse(resSTR);
    //     console.log(resJSON.body)
    //     console.log(resJSON.status)
    //     this.documentFormResponseString = resJSON.body
    //     this.documentResponseStatus = resJSON.status
    //   }
    // );
>>>>>>> 5ced0f0e5a732b288b50e72bc631aeb34c7de595


  }


  updateDocument(){
    console.log("onSubmit Document called");

    this.documentsSubmitted=true;
    this.newDocuments.photo= this.documentForm.controls['photo'].value;
    this.newDocuments.idProof=this.documentForm.controls['idProof'].value;
    this.newDocuments.addressProof=this.documentForm.controls['addressProof'].value;

  }

}
