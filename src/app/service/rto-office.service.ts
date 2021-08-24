import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RtoOffice } from '../models/rto-office.model';

@Injectable({
  providedIn: 'root'
})
export class RtoOfficeService {

  private baseUrl = 'http://localhost:6969/ovl/rtoOffice';

  constructor(
    private http: HttpClient
  ) { }

  addRtoOffice(rtoOffice: RtoOffice):Observable<HttpResponse<String>>{
    return this.http.post(`${this.baseUrl}`+`/add-rto-office`, rtoOffice, {responseType: 'text', observe: 'response'});
  }

}
