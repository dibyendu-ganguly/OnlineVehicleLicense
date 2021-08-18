import { TestResult } from "./test-result.enum";

export class Appointment {

    constructor(
        public appointmentNumber : string,
        public testDate : Date,
        public timeSlot : Date,
        public testResult : TestResult
    ){};
    
}