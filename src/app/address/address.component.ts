import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressType } from '../models/address-type.enum';
import { Address } from '../models/address.model';
import { TemporaryAddress } from '../models/temporary-address.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public stateList = [
    "Andhra Pradesh", 
    "Arunachal Pradesh", 
    "Assam", 
    "Bihar", 
    "Chhattisgarh", 
    "Goa", 
    "Gujarat", 
    "Haryana", 
    "Himachal Pradesh", 
    "Jharkhand", 
    "Karnataka", 
    "Kerala", 
    "Madhya Pradesh", 
    "Maharashtra", 
    "Manipur", 
    "Meghalaya", 
    "Mizoram", 
    "Nagaland", 
    "Odisha", 
    "Punjab", 
    "Rajasthan", 
    "Sikkim", 
    "Tamil Nadu", 
    "Telangana", 
    "Tripura", 
    "Uttarakhand", 
    "Uttar Pradesh", 
    "West Bengal",
    "Andaman and Nicobar Islands", 
    "Chandigarh", 
    "Dadra and Nagar Haveli",
    "Daman & Diu", 
    "The Government of NCT of Delhi", 
    "Jammu & Kashmir", 
    "Ladakh", 
    "Lakshadweep", 
    "Puducherry"
  ];

  isAddressSame = false;
  isAddressPresent = false;

  applicantPresentAddress: TemporaryAddress = new TemporaryAddress();

  temporaryAddressForm !: FormGroup;
  permanentAddressForm !: FormGroup;

  isSame !: FormControl;

  house !: FormControl;
  landmark !: FormControl;
  city !: FormControl;
  state !: FormControl;
  pincode !: FormControl;
  
  permanentHouse !: FormControl;
  permanentLandmark !: FormControl;
  permanentCity !: FormControl;
  permanentState !: FormControl;
  permanentPincode !: FormControl;

  addressFormSubmitted = false;
  temporaryAddressFormSubmitted = false;
  permanentAddressFormSubmitted = false;

  addressFormResponseString?: String;
  addressResponseStatus?: Number;

  isLoggedIn: boolean = false;
  userName!: string;
  role ?: string;

  constructor(
    private router : Router,
    private userService : UserService
  ) { }

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

    this.house = new FormControl(null, [Validators.required]);
    this.landmark = new FormControl(null);
    this.city = new FormControl(null, [Validators.required]);
    this.state = new FormControl({value: "MAHARASHTRA", disabled: true});
    this.pincode = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{6}$')]);
    
    this.isSame = new FormControl(false);

    this.permanentHouse = new FormControl(null, [Validators.required]);
    this.permanentLandmark = new FormControl(null);
    this.permanentCity = new FormControl(null, [Validators.required]);
    this.permanentState = new FormControl(null, [Validators.required]);
    this.permanentPincode = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{6}$')]);

    this.temporaryAddressForm = new FormGroup(
      {
        'house': this.house,
        'landmark': this.landmark,
        'city': this.city,
        'state': this.state,
        'pincode': this.pincode,
      }
    );

    this.permanentAddressForm = new FormGroup(
      {
        'permanentHouse': this.permanentHouse,
        'permanentLandmark': this.permanentLandmark,
        'permanentCity': this.permanentCity,
        'permanentState': this.permanentState,
        'permanentPincode': this.permanentPincode,
        'isSame': this.isSame,
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

  }

  newTempAddr: TemporaryAddress = new TemporaryAddress();
  permanentAddress: Address = new Address();
  addTemporaryAddress(){
    console.log("In Temporary Address...");
    console.log(this.temporaryAddressForm);
    this.addressFormSubmitted = true;
    this.newTempAddr.house = this.temporaryAddressForm.controls['house'].value;
    this.newTempAddr.landmark = this.temporaryAddressForm.controls['landmark'].value;
    this.newTempAddr.city = this.temporaryAddressForm.controls['city'].value;
    this.newTempAddr.state = this.temporaryAddressForm.controls['state'].value;
    this.newTempAddr.pincode = this.temporaryAddressForm.controls['pincode'].value;

    this.userService.addTemporaryAddress(this.userName, this.newTempAddr, this.isSame.value).subscribe(
      data => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        console.log(data)
        console.log(data.body)
        console.log(data.status)
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.addressFormResponseString = resJSON.body
        this.addressResponseStatus = resJSON.status

        console.log(this.addressFormResponseString);
      },
      error => {
        console.log(error)
        let resSTR = JSON.stringify(error);
        let resJSON = JSON.parse(resSTR);
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.addressFormResponseString = resJSON.body
        this.addressResponseStatus = resJSON.status
      }
    );

    this.temporaryAddressForm.reset();
    if(this.isAddressSame) {
      this.permanentAddressForm.reset();
      window.location.reload();
    }
  }

  addPermanentAddress(){
      console.log("In Permanent Address...");
      console.log(this.permanentAddressForm);
      this.addressFormSubmitted = true;
      this.permanentAddress.house = this.permanentAddressForm.controls['permanentHouse'].value;
      this.permanentAddress.landmark = this.permanentAddressForm.controls['permanentLandmark'].value;
      this.permanentAddress.city = this.permanentAddressForm.controls['permanentCity'].value;
      this.permanentAddress.state = this.permanentAddressForm.controls['permanentState'].value;
      this.permanentAddress.pincode = this.permanentAddressForm.controls['permanentPincode'].value;

      this.userService.addPermanentAddress(this.userName, this.permanentAddress).subscribe(
        data => {
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          console.log(data)
          console.log(data.body)
          console.log(data.status)
          console.log(resJSON.body)
          console.log(resJSON.status)
          this.addressFormResponseString = resJSON.body
          this.addressResponseStatus = resJSON.status

          console.log(this.addressFormResponseString);
        },
        error => {
          console.log(error)
          let resSTR = JSON.stringify(error);
          let resJSON = JSON.parse(resSTR);
          console.log(resJSON.body)
          console.log(resJSON.status)
          this.addressFormResponseString = resJSON.body
          this.addressResponseStatus = resJSON.status
        }
      );
      this.permanentAddressForm.reset();
      window.location.reload();
  }

  updateTemporaryAddress(){
    console.log("In Temporary Address Update...");
    console.log(this.temporaryAddressForm);
    this.temporaryAddressFormSubmitted = true;
    this.newTempAddr.house = this.temporaryAddressForm.controls['house'].value;
    this.newTempAddr.landmark = this.temporaryAddressForm.controls['landmark'].value;
    this.newTempAddr.city = this.temporaryAddressForm.controls['city'].value;
    this.newTempAddr.state = this.temporaryAddressForm.controls['state'].value;
    this.newTempAddr.pincode = this.temporaryAddressForm.controls['pincode'].value;

    this.userService.updateTemporaryAddress(this.userName, this.newTempAddr, AddressType.PRESENT).subscribe(
      data => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        console.log(data)
        console.log(data.body)
        console.log(data.status)
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.addressFormResponseString = resJSON.body
        this.addressResponseStatus = resJSON.status

        console.log(this.addressFormResponseString);
      },
      error => {
        console.log(error)
        let resSTR = JSON.stringify(error);
        let resJSON = JSON.parse(resSTR);
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.addressFormResponseString = resJSON.body
        this.addressResponseStatus = resJSON.status
      }
    );

    this.temporaryAddressForm.reset();
  }

  updatePermanentAddress(){
    console.log("In Permanent Address Update...");
    console.log(this.permanentAddressForm);
    this.permanentAddressFormSubmitted = true;
    this.permanentAddress.house = this.permanentAddressForm.controls['permanentHouse'].value;
    this.permanentAddress.landmark = this.permanentAddressForm.controls['permanentLandmark'].value;
    this.permanentAddress.city = this.permanentAddressForm.controls['permanentCity'].value;
    this.permanentAddress.state = this.permanentAddressForm.controls['permanentState'].value;
    this.permanentAddress.pincode = this.permanentAddressForm.controls['permanentPincode'].value;

    this.userService.updatePermanentAddress(this.userName, this.permanentAddress, AddressType.PERMANENT).subscribe(
      data => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        console.log(data)
        console.log(data.body)
        console.log(data.status)
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.addressFormResponseString = resJSON.body
        this.addressResponseStatus = resJSON.status

        console.log(this.addressFormResponseString);
      },
      error => {
        console.log(error)
        let resSTR = JSON.stringify(error);
        let resJSON = JSON.parse(resSTR);
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.addressFormResponseString = resJSON.body
        this.addressResponseStatus = resJSON.status
      }
    );

    this.permanentAddressForm.reset();
  }

  onSubmit(){
    this.addTemporaryAddress();
    if(!this.isAddressSame){
      this.addPermanentAddress();
    }
  }

  onChange(e : any){
    if(e.target.checked){
      this.isAddressSame = true;
      this.permanentAddressForm.controls.requiredControl.clearValidators();
      this.permanentAddressForm.updateValueAndValidity();
    }
    else{
      this.isAddressSame = false;
    }
  }
}
