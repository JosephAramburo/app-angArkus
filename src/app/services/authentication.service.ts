import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginInterface } from '@interfaces/login-interface';
import { UserInterface } from '@interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient  : HttpClient, 
    private localStorage:LocalStorageService) { }

  public url : string = `${environment.apiUrl}authentication`;

  login(body: LoginInterface): Observable<UserInterface>{
    return this.httpClient.post<UserInterface>(this.url, body);
  }

  logOut(body: LoginInterface): Observable<any>{
    return this.httpClient.post<any>(`${this.url}/logOut`, body);
  }

  getToken():string{
    return this.localStorage.get("token");
  }
}
