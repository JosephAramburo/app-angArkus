import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginInterface } from '@interfaces/login-interface';
import { LoginResponseInterface } from '@interfaces/login-response-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient  : HttpClient, 
    private localStorage:LocalStorageService) { }

  public url : string = `${environment.apiUrl}authorization`;

  login(body: LoginInterface): Observable<LoginResponseInterface>{
    return this.httpClient.post<LoginResponseInterface>(`${this.url}/login`, body);
  }

  logOut(body: LoginInterface): Observable<any>{
    return this.httpClient.post<any>(`${this.url}/logOut`, body);
  }

  getToken():string{
    return this.localStorage.get("token");
  }
}
