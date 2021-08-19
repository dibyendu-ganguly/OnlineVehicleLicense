import { TestResult } from "./test-result.enum";

export class Appointment {

    appointmentNumber : string = "";
    testDate : Date = new Date();
    timeSlot : Date = new Date();
    testResult : TestResult = TestResult.PENDING;
    
    constructor(){};
    
}