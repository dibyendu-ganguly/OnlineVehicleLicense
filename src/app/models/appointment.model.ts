import { TestResult } from "./test-result.enum";

export class Appointment {

    testDate : Date = new Date();
    timeSlot : Date = new Date();
    testResult : TestResult = TestResult.PENDING;
    
    constructor(){};
    
}