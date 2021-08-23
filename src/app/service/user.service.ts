import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user.model';
import { Applicant } from '../models/applicant.model';
import { TemporaryAddress } from '../models/temporary-address.model';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:6969/ovl/user';
  constructor(private http: HttpClient
    ) { }

  registerUser(user: Users):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+'/register-user',user,{responseType: 'text', observe: 'response'});
  }

  loginUser(username: string, pass: string):Observable<HttpResponse<String>>{
    let params = new HttpParams()
    .set('username', username)
    .set('pass', pass);
    return this.http.post(`${this.baseUrl}`+'/login-user',params,{responseType: 'text', observe: 'response'});
  }

  addApplicantProfile(username:string, applicant: Applicant):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+`/${username}/add-applicant-profile`,applicant,{responseType: 'text', observe: 'response'});
  }

  viewApplicantProfile(username:string):Observable<any>{
    return this.http.get(`${this.baseUrl}`+`/${username}/view-applicant-profile`);
  }
  
  addTemporaryAddress(username:string, tempAddr: TemporaryAddress, isSame: boolean):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+`/${username}/address/add-temporary-address/${isSame}`, tempAddr, {responseType: 'text', observe: 'response'});
  }

  addPermanentAddress(username:string, addr: Address):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+`/${username}/address/add-address`, addr, {responseType: 'text', observe: 'response'});
  }

}
