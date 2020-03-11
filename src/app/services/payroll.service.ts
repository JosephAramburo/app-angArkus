import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PayrollFiltersRequest } from '@interfaces/payroll-filters-request';
import { PayrollFiltersResponse } from '@interfaces/payroll-filters-response';
import { Payroll } from '@interfaces/payroll';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  private url : string = `${environment.apiUrl}payroll`;
  constructor(
    private httpClient  : HttpClient
  ) { }  

  get(params: PayrollFiltersRequest): Observable<PayrollFiltersResponse>{
    let httpParams = new HttpParams();

    for(let key in params){
        httpParams = httpParams.append(key, params[key]);
    }

    return this.httpClient.get<PayrollFiltersResponse>(`${this.url}`,{params : httpParams});
  }

  getbyIdAndYearAndMonth(id : number, year: number, month : number): Observable<Payroll>{
    let httpParams  = new HttpParams();
    // httpParams      = httpParams.append('id', id.toString());
    httpParams      = httpParams.append('year', year.toString());
    httpParams      = httpParams.append('month', month.toString());

    return this.httpClient.get<Payroll>(`${this.url}/${id}`, {params : httpParams});
  } 

  generateHistory(): Observable<any>{
    return this.httpClient.post<any>(`${this.url}`,{});
  }
}
