import { ApplicationStatus } from "./application-status.enum";
import { Documents } from "./document.model";
import { LicenseType } from "./license-type.enum";

export class Application {

    constructor(
        public applicationNumber : string,
        public applicationDate : Date,
        public modeOfPayment : string,
        public amountPaid : number,
        public paymentStatus : string,
        public remarks : string,
        public applicationStatus : ApplicationStatus,
        public applicationType : LicenseType,
        public docs : Documents
    ){};
    
}