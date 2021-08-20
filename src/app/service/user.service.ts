import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:6969/ovl/user';

  constructor(private http: HttpClient) { }

  registerUser(user: Users):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+'/register-user',user,{responseType: 'text', observe: 'response'});
  }

  loginUser(username : string, pass : string):Observable<HttpResponse<String>>{
    return this.http.get(`${this.baseUrl}`+'/login-user',{
    params: new HttpParams({fromString : "username="+username+"&pass="+pass}),
    responseType: 'text', observe: 'response'});
  }
  

}
