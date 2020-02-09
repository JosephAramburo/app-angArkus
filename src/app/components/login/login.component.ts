import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '@services/form-validation.service';
import { AuthenticationService } from '@services/authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginInterface } from '@interfaces/login-interface';
import { ToastrService } from 'ngx-toastr';

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
    private _route                  : Router
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
      this._route.navigate(['/home']);
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
