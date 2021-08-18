import { LicenseType } from "./license-type.enum";

export class License {

    constructor(
        public licenseNumber : string,
        public licenseType : LicenseType,
        public dateOfIssue : Date,
        public validTill : Date
    ){};
    
}