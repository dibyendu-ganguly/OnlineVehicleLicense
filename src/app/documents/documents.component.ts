import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data, error } from 'jquery';
import { Documents } from '../models/document.model';
import { LicenseType } from '../models/license-type.enum';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  public applicationTypeList = LicenseType; 

  documentForm !: FormGroup;
  photo !: FormControl;
  idProof !: FormControl;
  addressProof !:FormControl;
  applicationType !: FormControl;

  documentsSubmitted =false;

  documentFormResponseString?: String;
  documentResponseStatus?: Number;
  
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

   applicationNumber : string="";
   document :Documents =new Documents();
   isPresent=false;

   isLoggedIn : boolean = false;
   userName !: string;
   role ?: string;
   

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

    this.photo=new FormControl(null,[Validators.required]);
    this.idProof=new FormControl(null,[Validators.required]);
    this.addressProof =new FormControl(null,[Validators.required]);
    this.applicationType=new FormControl(null,[Validators.required]);


    this.documentForm=new FormGroup(
      {
        'photo':this.photo,
        'idProof':this.idProof,
        'addressProof':this.addressProof,
        'applicationType':this.applicationType,
      }
    )
  }

  newDocuments : Documents=new Documents();

  photoFileName = '';
  photoFile!:File;

  idFileName = '';
  idFile!:File;  

  addressFileName = '';
  addressFile!:File;

  onIdSelected(event:any){
    this.idFile = event.target.files[0];

    if (this.idFile) {
        this.idFileName = this.idFile.name;
        console.log(this.idFile);

        const idProof = new FormData();
        idProof.append('idProof',this.idFile);
        console.log(idProof.get('idProof'));
        this.userService.uploadIdProof(this.userName+this.documentForm.controls['applicationType'].value,idProof).subscribe(
          data=>{
            console.log(data);
          },
          error=>{
            console.log(error);
          }
        );
    }   
  }

  onPhotoSelected(event : any){
    this.photoFile = event.target.files[0];

    if (this.photoFile) {
        this.photoFileName = this.photoFile.name;
        console.log(this.photoFile);

        const photo = new FormData();
        photo.append('photo',this.photoFile);
        console.log(photo.get('photo'));
        this.userService.uploadPhoto(this.userName+this.documentForm.controls['applicationType'].value,photo).subscribe(
          data=>{
            console.log(data);
          },
          error=>{
            console.log(error);
          }
        );
    }  
  }

  onAddressSelected(event: any) {

    this.addressFile = event.target.files[0];

    if (this.addressFile) {
        this.addressFileName = this.addressFile.name;
        console.log(this.addressFile);

        const addressProof = new FormData();
        addressProof.append('addressProof',this.addressFile);
        console.log(addressProof.get('addressProof'));
        this.userService.uploadAddressProof(this.userName+this.documentForm.controls['applicationType'].value,addressProof).subscribe(
          data=>{
            console.log(data);
          },
          error=>{
            console.log(error);
          }
        );
    }
}




  // addDocument()
  // {
  //   console.log(this.addressFile);
  //   console.log(this.idFile);
  //   console.log(this.photoFile);
  //   console.log("onSubmit Document called");

  //   //this.documentsSubmitted=true;
  //   // this.newDocuments.photo= this.documentForm.controls['photo'].value;
  //   // this.newDocuments.idProof=this.documentForm.controls['idProof'].value;
  //   // this.newDocuments.addressProof=this.documentForm.controls['addressProof'].value;
  //   // console.log(this.newDocuments.photo);
    
    
   
  //   const photo = new FormData();
  //   photo.append('photo',this.photoFile);
  //   console.log(photo.get('photo'));
  //   this.userService.uploadPhoto(this.userName+this.documentForm.controls['applicationType'].value,photo).subscribe(
  //     data=>{
  //       console.log(data);
  //     },
  //     error=>{
  //       console.log(error);
  //     }
  //   );

  //   const idProof = new FormData();
  //   idProof.append('idProof',this.idFile);
  //   console.log(idProof.get('idProof'));
  //   this.userService.uploadIdProof(this.userName+this.documentForm.controls['applicationType'].value,idProof).subscribe(
  //     data=>{
  //       console.log(data);
  //     },
  //     error=>{
  //       console.log(error);
  //     }
  //   );

  //   const addressProof = new FormData();
  //   addressProof.append('addressProof',this.addressFile);
  //   console.log(addressProof.get('addressProof'));
  //   this.userService.uploadAddressProof(this.userName+this.documentForm.controls['applicationType'].value,addressProof).subscribe(
  //     data=>{
  //       console.log(data);
  //     },
  //     error=>{
  //       console.log(error);
  //     }
  //   );


  //   // this.userService.addDocumentApplication(this.applicationNumber,this.newDocuments).subscribe(
  //   //   data => {
  //   //     let resSTR = JSON.stringify(data);
  //   //     let resJSON = JSON.parse(resSTR);
  //   //     console.log(data)
  //   //     console.log(data.body)
  //   //     console.log(data.status)
  //   //     console.log(resJSON.body)
  //   //     console.log(resJSON.status)
  //   //     this.documentFormResponseString = resJSON.body
  //   //     this.documentResponseStatus = resJSON.status

  //   //     console.log(this.documentFormResponseString)
  //   //     window.location.reload();
  //   //   },
  //   //   error => {
  //   //     console.log(error)
  //   //     let resSTR = JSON.stringify(error);
  //   //     let resJSON = JSON.parse(resSTR);
  //   //     console.log(resJSON.body)
  //   //     console.log(resJSON.status)
  //   //     this.documentFormResponseString = resJSON.body
  //   //     this.documentResponseStatus = resJSON.status
  //   //   }
  //   // );


  // }


  // updateDocument(){
  //   console.log("onSubmit Document called");

  //   this.documentsSubmitted=true;
  //   this.newDocuments.photo= this.documentForm.controls['photo'].value;
  //   this.newDocuments.idProof=this.documentForm.controls['idProof'].value;
  //   this.newDocuments.addressProof=this.documentForm.controls['addressProof'].value;

  // }





}
