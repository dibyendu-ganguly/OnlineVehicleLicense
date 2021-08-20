import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:6969/ovl/user/register-user';
  constructor(private http: HttpClient
    ) { }

  registerUser(user: Users):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`,user,{responseType: 'text', observe: 'response'});
  }

}
