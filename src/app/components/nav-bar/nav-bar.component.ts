import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private _route : Router,
    private _localStorage : LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  logout():void{
    let keys : string[] = this._localStorage.keys();

    keys.forEach(x => {
      this._localStorage.remove(x);
    });

    this._route.navigate(['/login']);

  }

}
