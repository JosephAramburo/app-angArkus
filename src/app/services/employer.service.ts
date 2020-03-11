import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { EmployerInterface } from '@interfaces/employer-interface';
import { EmployerFiltersRequestInterface } from '@interfaces/employer-filters-request-interface';
import { EmployerFiltersResponseInterface } from '@interfaces/employer-filters-response-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private url : string = `${environment.apiUrl}employer`;
  constructor(
    private httpClient  : HttpClient
  ) { }

  get(params: EmployerFiltersRequestInterface): Observable<EmployerFiltersResponseInterface>{
    let httpParams = new HttpParams();

    for(let key in params){
        httpParams = httpParams.append(key, params[key]);
    }

    return this.httpClient.get<EmployerFiltersResponseInterface>(`${this.url}`,{params : httpParams});
  }

  getbyId(id : number): Observable<EmployerInterface>{
    return this.httpClient.get<EmployerInterface>(`${this.url}/${id}`);
  } 

  save(params: EmployerInterface): Observable<EmployerInterface>{
    return this.httpClient.post<EmployerInterface>(`${this.url}`, params);
  }

  update(params: EmployerInterface): Observable<EmployerInterface>{
    return this.httpClient.put<EmployerInterface>(`${this.url}/${params.id}`, params);
  }

  delete(id: number): Observable<EmployerInterface>{
    return this.httpClient.delete<EmployerInterface>(`${this.url}/${id}`);
  }
}
