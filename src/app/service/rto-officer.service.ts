import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';
import { Appointment } from '../models/appointment.model';
import { RtoOffice } from '../models/rto-office.model';
import { RtoOfficer } from '../models/rto-officer.model';

@Injectable({
  providedIn: 'root'
})
export class RtoOfficerService {

  private baseUrl = 'http://localhost:6969/ovl/rtoOfficer';

  constructor(
    private http: HttpClient,
  ) { }

  loginRtoOfficer(username: string, pass: string):Observable<HttpResponse<String>> {
    let params = new HttpParams()
    .set('username', username)
    .set('pass', pass);
    return this.http.post(`${this.baseUrl}`+'/login-rto-officer',params,{responseType: 'text', observe: 'response'});
  }

  addRtoOfficer(rtoId: number, rtoOfficer: RtoOfficer):Observable<HttpResponse<String>> {
    return this.http.post(`${this.baseUrl}`+'/'+`${rtoId}`+'/add-rto-officer', rtoOfficer,{responseType: 'text', observe: 'response'});
  }

  getRtoId(username: String):Observable<number> {
    return this.http.get<number>(`${this.baseUrl}`+`/get-rtoId/${username}`);
  }

  viewApplications(rtoId: number):Observable<Set<Application>> {
    return this.http.get<Set<Application>>(`${this.baseUrl}/view-all-applications/` + `${rtoId}`);
  }

  viewAppointments(rtoId : number):Observable<Set<Appointment>> {
    return this.http.get<Set<Appointment>>(`${this.baseUrl}`+`/view-all-appointments/`+`${rtoId}`);
  }

}
