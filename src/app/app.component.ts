import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LocalStorageService } from 'angular-2-local-storage';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app-ang';

  constructor(
    private localStorageService : LocalStorageService,
    private _router             : Router
  ){ }

  ngOnInit(){
    const jwt           = new JwtHelperService();
    let token : string  = this.localStorageService.get('token');

    if(typeof(token) !== 'undefined' && token !== null){      
      if(jwt.isTokenExpired(token)){
        this._router.navigate(['/login']);
      }
    }
  }
}
