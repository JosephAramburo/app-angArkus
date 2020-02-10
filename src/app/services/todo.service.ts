import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { LocalStorageService } from 'angular-2-local-storage';
import { TodoInterface } from '@interfaces/todo-interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private httpClient  : HttpClient, 
    private localStorage:LocalStorageService) { }

  public url : string = `${environment.apiUrl}todo`;

  getbyId(id : string): Observable<TodoInterface>{
    return this.httpClient.get<TodoInterface>(`${this.url}/${id}`);
  }

  get(params: TodoInterface): Observable<TodoInterface[]>{
    let httpParams = new HttpParams();

    for(let key in params){
      if(typeof(params[key]) !== 'undefined' && params[key] !== null && params[key] !== '')
        httpParams = httpParams.append(key, params[key]);
    }

    return this.httpClient.get<TodoInterface[]>(`${this.url}`,{params : httpParams});
  }

  save(params: TodoInterface): Observable<TodoInterface>{
    return this.httpClient.post<TodoInterface>(`${this.url}`, params);
  }

  update(params: TodoInterface): Observable<TodoInterface>{
    return this.httpClient.put<TodoInterface>(`${this.url}/${params._id}`, params);
  }

  delete(id: string): Observable<TodoInterface>{
    return this.httpClient.delete<TodoInterface>(`${this.url}/${id}`);
  }
}
