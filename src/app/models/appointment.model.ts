import { Application } from "./application.model";
import { TestResult } from "./test-result.enum";

export class Appointment {

    appointmentNumber : string = "";
    testDate : Date = new Date();
    timeSlot : Date = new Date();
    testResult : TestResult = TestResult.PENDING;
    application : Application = new Application();
    
    constructor(){};
    
}