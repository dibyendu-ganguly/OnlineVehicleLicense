import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
