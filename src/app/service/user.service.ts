import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user.model';
import { Applicant } from '../models/applicant.model';
import { TemporaryAddress } from '../models/temporary-address.model';
import { Address } from '../models/address.model';
<<<<<<< HEAD
import { Documents } from '../models/document.model';
=======
import { AddressType } from '../models/address-type.enum';
>>>>>>> 5ced0f0e5a732b288b50e72bc631aeb34c7de595
import { Application } from '../models/application.model';

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

<<<<<<< HEAD
  addDocumentApplication(applicationNumber:string,doc:Documents):Observable<HttpResponse<String>>{
    this.http.post(`${this.baseUrl}`+`/documents/${applicationNumber}/upload-photo`, doc.photo, {responseType: 'text', observe: 'response'});
    this.http.post(`${this.baseUrl}`+`/documents/${applicationNumber}/upload-idProof`, doc.idProof, {responseType: 'text', observe: 'response'});
    return this.http.post(`${this.baseUrl}`+`/documents/${applicationNumber}/upload-addressProof`, doc.addressProof, {responseType: 'text', observe: 'response'});
  }

  viewApplication(userName:string):Observable<Application>{
    return this.http.get<Application>(`${this.baseUrl}`+`/${userName}/view-applicant-profile`);
  }

}
=======
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

 }
>>>>>>> 5ced0f0e5a732b288b50e72bc631aeb34c7de595
