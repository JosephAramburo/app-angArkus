import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '@services/form-validation.service';
import { AuthenticationService } from '@services/authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginInterface } from '@interfaces/login-interface';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'angular-2-local-storage';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup;

  constructor(
    private formValidation          : FormValidationService,
    private _authenticationServices : AuthenticationService,
    private _toastr                 : ToastrService,
    private _route                  : Router,
    private _localStorage           : LocalStorageService,
    private _permissionsService     : NgxPermissionsService
  ) { }

  ngOnInit(): void {
    this.frmLogin = new FormGroup({
      email     : new FormControl('', [ Validators.required, Validators.email]),
      password  : new FormControl('', [Validators.required])
    });
  }

  login():void{
    if(!this.frmLogin.valid){
      this.formValidation.validateAllFormFields(this.frmLogin);
      return;
    }

    let parameters : LoginInterface = {
      email     : this.frmLogin.get('email').value,
      password  : this.frmLogin.get('password').value
    };

    this._authenticationServices.login(parameters).subscribe(res => {
      const permissions = res.isAdmin ? ["ADMIN"] : [];

      this._localStorage.set('name', res.name);
      this._localStorage.set('id', res.id);
      this._localStorage.set('token', res.token);
      this._localStorage.set('isAdmin', res.isAdmin);
      this._localStorage.set('permissions', permissions);

      this._permissionsService.addPermission(permissions);

      this._toastr.success('Bienvenido!');

      if(res.isAdmin)
        this._route.navigate(['/home']);
      else
        this._route.navigate([`/payroll/${res.id}`]);

    },(err:HttpErrorResponse) => {
      this._toastr.error(this.formValidation.messageError(err));
    });

  }

  inputValid(name){
    return this.formValidation.inputValidation(this.frmLogin, name);
  }

  showErrors(name):boolean{
    return this.formValidation.showErrors(this.frmLogin, name);
  }

}
