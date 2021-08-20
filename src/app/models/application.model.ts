import { ApplicationStatus } from "./application-status.enum";
import { Documents } from "./document.model";
import { LicenseType } from "./license-type.enum";

export class Application {

    applicationNumber : string = "";
    applicationDate : Date = new Date();
    modeOfPayment : string = "";
    amountPaid : number = 0.00;
    paymentStatus : string = "";
    remarks : string = "";
    applicationStatus : ApplicationStatus = ApplicationStatus.PENDING;
    applicationType : LicenseType = LicenseType.LL;
    docs : Documents = new Documents();
    
    constructor(){};
    
}