import { Gender } from "./gender.enum";

export class Applicant {
    constructor(
        public applicantId : string,
        public firstName : string,
        public middleName : string,
        public lastName : string,
        public dateOfBirth : Date,
        public placeOfBirth : string,
        public gender : Gender,
        public qualification : string,
        public mobile : string,
        public nationality : string,
        public vehicleType : string,
        public vehicleNumber : string
    ){};
}