import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToastrService }      from 'ngx-toastr';
import 'rxjs/add/operator/do';
import { NgxSpinnerService } from "ngx-spinner";
import { map, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private _localStorage: LocalStorageService, 
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    // add authorization header with jwt token if available
    let currentUser : string = this._localStorage.get('token');
    if (typeof(currentUser) !== 'undefined' && currentUser !== null) {
        request = request.clone({
            setHeaders: {
                Authorization: currentUser
            }
        });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse)
              this.spinner.hide();

          if (event instanceof HttpErrorResponse)
              this.spinner.hide();

          return event;
      }),
      catchError((error: HttpErrorResponse) => {
          this.spinner.hide();
          return throwError(error);
      })
    );
  }
}
