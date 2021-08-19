import { LicenseType } from "./license-type.enum";

export class License {

    licenseNumber : string = "";
    licenseType : LicenseType = LicenseType.LL;
    dateOfIssue : Date = new Date();
    validTill : Date = new Date();
    
    constructor(){};
    
}