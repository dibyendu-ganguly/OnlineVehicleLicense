import { Gender } from "./gender.enum";

export class Applicant {

    applicantId : string = "";
    firstName : string = "";
    middleName : string = "";
    lastName : string = "";
    dateOfBirth : Date = new Date();
    placeOfBirth : string = "";
    gender : Gender = Gender.MALE;
    qualification : string = "";
    mobile : string = "";
    nationality : string = "";
    vehicleType : string = "";
    vehicleNumber : string = "";

    constructor(){};
}