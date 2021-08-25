import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user.model';
import { Applicant } from '../models/applicant.model';
import { TemporaryAddress } from '../models/temporary-address.model';
import { Address } from '../models/address.model';
import { AddressType } from '../models/address-type.enum';
import { Application } from '../models/application.model';
import { Appointment } from '../models/appointment.model';

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

  viewApplicantProfile(username:string):Observable<Applicant>{
    return this.http.get<Applicant>(`${this.baseUrl}`+`/${username}/view-applicant-profile`);
  }

  updateApplicantProfile(username:string, applicant: Applicant):Observable<HttpResponse<String>>{
    return this.http.put(`${this.baseUrl}`+`/${username}/update-applicant-profile`,applicant,{responseType: 'text', observe: 'response'});
  }

  addTemporaryAddress(username:string, tempAddr: TemporaryAddress, isSame: boolean):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+`/${username}/address/add-temporary-address/${isSame}`, tempAddr, {responseType: 'text', observe: 'response'});
  }

  addPermanentAddress(username:string, addr: Address):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+`/${username}/address/add-address`, addr, {responseType: 'text', observe: 'response'});
  }

  viewPresentAddress(username:string):Observable<TemporaryAddress> {
    return this.http.get<TemporaryAddress>(`${this.baseUrl}`+`/${username}/address/view-present-address`);
  }

  viewPermanentAddress(username:string):Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}`+`/${username}/address/view-permanent-address`);
  }

  updateTemporaryAddress(username:string, tempAddr: TemporaryAddress, addrType: AddressType):Observable<HttpResponse<String>>{
    return this.http.put(`${this.baseUrl}`+`/${username}/address/update-address/`+`${addrType}`, tempAddr, {responseType: 'text', observe: 'response'});
  }

  updatePermanentAddress(username:string, permAddr: Address, addrType: AddressType):Observable<HttpResponse<String>>{
    return this.http.put(`${this.baseUrl}`+`/${username}/address/update-address/`+`${addrType}`, permAddr, {responseType: 'text', observe: 'response'});
  }

  addApplication(username: string, application: Application, rtoId: number):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+`/${username}/application/${rtoId}/createApplication`, application, {responseType: 'text', observe: 'response'});
  }

  uploadPhoto(applicationNumber: string, photo: FormData):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+`/document/${applicationNumber}/upload-photo` , photo, {responseType: 'text', observe: 'response'});
  }

  uploadIdProof(applicationNumber: string, idProof: FormData):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+`/document/${applicationNumber}/upload-idProof` , idProof, {responseType: 'text', observe: 'response'});
  }

  uploadAddressProof(applicationNumber: string, addressProof: FormData):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+`/document/${applicationNumber}/upload-addressProof` , addressProof, {responseType: 'text', observe: 'response'});
  }

  addAppointment(appointment: Appointment ,applicationNumber: string, rtoId : number):Observable<HttpResponse<String>>{
    let parameters = new HttpParams()
    .set('applicationNumber', applicationNumber)
    .set('rtoId', rtoId );
    console.log(appointment);
    return this.http.post(`${this.baseUrl}`+`/appointment/create-appointment`,appointment,{responseType: 'text', observe: 'response', params: parameters});
  }

  getLLApplication(applicationNumber:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`+`/viewApplication/${applicationNumber}`+'LL');
  }
  getDLApplication(applicationNumber:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`+`/viewApplication/${applicationNumber}`+'DL');
  }

 }
