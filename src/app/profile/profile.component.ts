import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Applicant } from '../models/applicant.model';
import { Gender } from '../models/gender.enum';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public genderList = Gender;
  public nationList = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Anguillan", "Argentine", "Armenian", "Australian", "Austrian", "Azerbaijani", 
  "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean", "Beninese", "Bermudian", "Bhutanese", "Bolivian", "Botswanan", "Brazilian", "British", "British Virgin Islander", "Bruneian", "Bulgarian", "Burkinan", "Burmese", "Burundian", 
  "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Cayman Islander", "Central African", "Chadian", "Chilean", "Chinese", "Citizen of Antigua and Barbuda", "Citizen of Bosnia and Herzegovina", "Citizen of Guinea-Bissau", "Citizen of Kiribati", "Citizen of Seychelles", "Citizen of the Dominican Republic", "Citizen of Vanuatu", "Colombian", "Comoran", "Congolese (Congo)", "Congolese (DRC)", "Cook Islander", "Costa Rican", "Croatian", "Cuban", "Cymraes", "Cymro", "Cypriot", "Czech", 
  "Danish", "Djiboutian", "Dominican", "Dutch", 
  "East Timorese", "Ecuadorean", "Egyptian", "Emirati", "English", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", 
  "Faroese", "Fijian", "Filipino", "Finnish", "French", 
  "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Gibraltarian", "Greek", "Greenlandic", "Grenadian", "Guamanian", "Guatemalan", "Guinean", "Guyanese", 
  "Haitian", "Honduran", "Hong Konger", "Hungarian", 
  "Icelandic", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", 
  "Jamaican", "Japanese", "Jordanian", 
  "Kazakh", "Kenyan", "Kittitian", "Kosovan", "Kuwaiti", "Kyrgyz", 
  "Lao", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtenstein citizen", "Lithuanian", "Luxembourger", 
  "Macanese", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese", "Martiniquais", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monegasque", "Mongolian", "Montenegrin", "Montserratian", "Moroccan", "Mosotho", "Mozambican", 
  "Namibian", "Nauruan", "Nepalese", "New Zealander", "Nicaraguan", "Nigerian", "Nigerien", "Niuean", "North Korean", "Northern Irish", "Norwegian", 
  "Omani", 
  "Pakistani", "Palauan", "Palestinian", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Pitcairn Islander","Polish",
  "Portuguese","Prydeinig","Puerto Rican",
  "Qatari",
  "Romanian","Russian","Rwandan",
  "Salvadorean","Sammarinese","Samoan","Sao Tomean","Saudi Arabian","Scottish","Senegalese","Serbian","Sierra Leonean","Singaporean","Slovak","Slovenian","Solomon Islander","Somali","South African","South Korean","South Sudanese","Spanish","Sri Lankan","St Helenian","St Lucian","Stateless","Sudanese","Surinamese","Swazi","Swedish","Swiss","Syrian",
  "Taiwanese","Tajik","Tanzanian", "Thai", "Togolese","Tongan","Trinidadian","Tristanian","Tunisian","Turkish","Turkmen","Turks and Caicos Islander","Tuvaluan",
  "Ugandan","Ukrainian","Uruguayan","Uzbek",
  "Vatican citizen","Venezuelan","Vietnamese","Vincentian","Wallisian","Welsh",
  "Yemeni",
  "Zambian","Zimbabwean" ];


  applicantForm !: FormGroup;

  firstName !: FormControl;
  middleName !: FormControl;
  lastName !: FormControl;
  dateOfBirth !: FormControl;
  placeOfBirth !: FormControl;
  gender !: FormControl;
  qualification !: FormControl;
  mobile !: FormControl;
  nationality !: FormControl;
  vehicleType !: FormControl;
  vehicleNumber !: FormControl;

  applicantFormSubmitted = false;

  applicantFormResponseString?: String;
  applicantResponseStatus?: Number;

  constructor(
    private router : Router,
    private userService : UserService,
    public datePipe : DatePipe
  ) { }

  isLoggedIn: boolean = false;
  userName!: string;

  applicant : Applicant = new Applicant();

  isPresent = false;
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

    

    this.userService.viewApplicantProfile(this.userName).subscribe(
      data => {
        console.log(data);
        this.applicant = data;
        console.log(this.applicant);
        if(this.applicant!=null){
          this.isPresent = true;
        } else{
          this.isPresent = false;
        }
        
      }
    );


    this.firstName = new FormControl(null, [Validators.required]);
    this.middleName = new FormControl(null);
    this.lastName = new FormControl(null, [Validators.required]);
    this.dateOfBirth = new FormControl(null,[Validators.required]);
    this.placeOfBirth = new FormControl(null, [Validators.required]);
    this.gender = new FormControl(null, [Validators.required]);
    this.qualification = new FormControl(null, [Validators.required]);
    this.mobile = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')]);
    this.nationality = new FormControl(null,[Validators.required]);
    this.vehicleType = new FormControl(null,[Validators.required]);
    this.vehicleNumber = new FormControl(null, [Validators.required, Validators.maxLength(12),Validators.minLength(12)]);
    

    this.applicantForm = new FormGroup({
      'firstName' : this.firstName,
      'middleName' : this.middleName,
      'lastName' : this.lastName,
      'dateOfBirth' : this.dateOfBirth,
      'placeOfBirth' : this.placeOfBirth,
      'gender' : this.gender,
      'qualification' : this.qualification,
      'mobile' : this.mobile,
      'nationality' : this.nationality,
      'vehicleType' : this.vehicleType,
      'vehicleNumber' : this.vehicleNumber
    });
  }

  newApplicantProfile : Applicant = new Applicant();

  // getApplicant(){
  //   let currentApplicant = new Applicant();
  //   this.userService.viewApplicantProfile(this.userName).subscribe(
  //     (data) => {
  //       currentApplicant = data;
  //       this.newApplicantProfile = currentApplicant;
  //       console.log("curr ",currentApplicant);
  //       console.log("data",data);
  //       this.applicant = data;
  //       console.log("applicant from data",this.newApplicantProfile);
  //     }
  //   );
  // }

  // getNewApp(){
  //   console.log(this.newApplicantProfile);
  // }

  addApplicant(){
    console.log("onsubmit profile called");
    console.log(this.applicantForm);
    this.applicantFormSubmitted = true;
    this.newApplicantProfile.firstName = this.applicantForm.controls['firstName'].value;
    this.newApplicantProfile.middleName = this.applicantForm.controls['middleName'].value;
    this.newApplicantProfile.lastName = this.applicantForm.controls['lastName'].value;
    this.newApplicantProfile.dateOfBirth = this.datePipe.transform(this.applicantForm.controls['dateOfBirth'].value, 'dd-MM-yyyy')!;
    this.newApplicantProfile.placeOfBirth = this.applicantForm.controls['placeOfBirth'].value;
    this.newApplicantProfile.gender = this.applicantForm.controls['gender'].value;
    this.newApplicantProfile.qualification = this.applicantForm.controls['qualification'].value;
    this.newApplicantProfile.mobile = this.applicantForm.controls['mobile'].value;
    this.newApplicantProfile.nationality = this.applicantForm.controls['nationality'].value;
    this.newApplicantProfile.vehicleType = this.applicantForm.controls['vehicleType'].value;
    this.newApplicantProfile.vehicleNumber = this.applicantForm.controls['vehicleNumber'].value;


    this.userService.addApplicantProfile(this.userName,this.newApplicantProfile).subscribe(
      data => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        console.log(data)
        console.log(data.body)
        console.log(data.status)
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.applicantFormResponseString = resJSON.body
        this.applicantResponseStatus = resJSON.status

        console.log(this.applicantFormResponseString)
        window.location.reload();
      },
      error => {
        console.log(error)
        let resSTR = JSON.stringify(error);
        let resJSON = JSON.parse(resSTR);
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.applicantFormResponseString = resJSON.body
        this.applicantResponseStatus = resJSON.status
      }
    );

    this.applicantFormSubmitted = true;
    //this.applicantForm.reset();
  }

  updateApplicant(){
    console.log("onsubmit profile called");
    console.log(this.applicantForm);
    this.applicantFormSubmitted = true;
    this.newApplicantProfile.firstName = this.applicantForm.controls['firstName'].value;
    this.newApplicantProfile.middleName = this.applicantForm.controls['middleName'].value;
    this.newApplicantProfile.lastName = this.applicantForm.controls['lastName'].value;
    this.newApplicantProfile.dateOfBirth = this.datePipe.transform(this.applicantForm.controls['dateOfBirth'].value, 'dd-MM-yyyy')!;
    this.newApplicantProfile.placeOfBirth = this.applicantForm.controls['placeOfBirth'].value;
    this.newApplicantProfile.gender = this.applicantForm.controls['gender'].value;
    this.newApplicantProfile.qualification = this.applicantForm.controls['qualification'].value;
    this.newApplicantProfile.mobile = this.applicantForm.controls['mobile'].value;
    this.newApplicantProfile.nationality = this.applicantForm.controls['nationality'].value;
    this.newApplicantProfile.vehicleType = this.applicantForm.controls['vehicleType'].value;
    this.newApplicantProfile.vehicleNumber = this.applicantForm.controls['vehicleNumber'].value;


    this.userService.updateApplicantProfile(this.userName,this.newApplicantProfile).subscribe(
      data => {
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);
        console.log(data)
        console.log(data.body)
        console.log(data.status)
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.applicantFormResponseString = resJSON.body
        this.applicantResponseStatus = resJSON.status

        console.log(this.applicantFormResponseString)
        
      },
      error => {
        console.log(error)
        let resSTR = JSON.stringify(error);
        let resJSON = JSON.parse(resSTR);
        console.log(resJSON.body)
        console.log(resJSON.status)
        this.applicantFormResponseString = resJSON.body
        this.applicantResponseStatus = resJSON.status
      }
    );

    this.applicantFormSubmitted = true;
    //this.applicantForm.reset();
  }

}
