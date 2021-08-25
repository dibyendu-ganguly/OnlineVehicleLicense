import { TestResult } from "./test-result.enum";

export class Appointment {

    testDate : string = "";
    timeSlot : Date = new Date();
    testResult : TestResult = TestResult.PENDING;
    
    constructor(){};
    
}