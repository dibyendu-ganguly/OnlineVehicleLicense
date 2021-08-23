import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  temporaryAddressForm !: FormGroup;
  permanentAddressForm !: FormGroup;

  house !: FormControl;
  landmark !: FormControl;
  city !: FormControl;
  state !: FormControl;
  permanentState !: FormControl;
  pincode !: FormControl;
  isSame !: FormControl;

  addressFormSubmitted = false;

  addressFormResponseString?: String;
  addressResponseStatus?: Number;

  isLoggedIn: boolean = false;
  userName!: string;

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
    }

    this.house = new FormControl(null, [Validators.required]);
    this.landmark = new FormControl(null);
    this.city = new FormControl(null, [Validators.required]);
    this.permanentState = new FormControl(null, [Validators.required]);
    this.state = new FormControl({value: "MAHARASHTRA", disabled: true}, [Validators.required]);
    this.pincode = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{6}$')]);
    this.isSame = new FormControl(false);

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
        'house': this.house,
        'landmark': this.landmark,
        'city': this.city,
        'permanentState': this.permanentState,
        'pincode': this.pincode,
        'isSame': this.isSame,
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

    this.userService.addTemporaryAddress(this.userName, this.newTempAddr, false).subscribe(
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
  }

  addPermanentAddress(){
      console.log("In Permanent Address...");
      console.log(this.permanentAddressForm);
      this.addressFormSubmitted = true;
      this.permanentAddress.house = this.permanentAddressForm.controls['house'].value;
      this.permanentAddress.landmark = this.permanentAddressForm.controls['landmark'].value;
      this.permanentAddress.city = this.permanentAddressForm.controls['city'].value;
      this.permanentAddress.state = this.permanentAddressForm.controls['permanentState'].value;
      this.permanentAddress.pincode = this.permanentAddressForm.controls['pincode'].value;

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
  }

  onSubmit(){
    this.addTemporaryAddress();
    this.addPermanentAddress();
  }
}
