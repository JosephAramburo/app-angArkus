import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LocalStorageService } from 'angular-2-local-storage';
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app-ang';

  constructor(
    private localStorageService : LocalStorageService,
    private _router             : Router,
    private permissionsService  : NgxPermissionsService
  ){ }

  ngOnInit(){
    const jwt           = new JwtHelperService();
    let token : string  = this.localStorageService.get('token');

    if(typeof(token) !== 'undefined' && token !== null){      
      if(jwt.isTokenExpired(token)){
        this._router.navigate(['/login']);
      }
    }
    if (this.localStorageService.get("permissions") !== null)
        this.permissionsService.loadPermissions(this.localStorageService.get("permissions"));

  }
}
