import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '@services/form-validation.service';
import { AuthenticationService } from '@services/authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginInterface } from '@interfaces/login-interface';

// interface ErrorMessage{
//   show    : boolean;
//   message : string;
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup;
  // error   : ErrorMessage = { show: false, message: "" };

  constructor(
    private formValidation          : FormValidationService,
    private _authenticationServices : AuthenticationService
  ) { }

  ngOnInit(): void {
    this.frmLogin = new FormGroup({
      email     : new FormControl('', [ Validators.required, Validators.email]),
      password  : new FormControl('', [Validators.required])
    });
  }

  login():void{
    if(!this.frmLogin.valid){
      // this.error.show = true;
      // this.error.message = "Faltan datos por ingresar";
      this.formValidation.validateAllFormFields(this.frmLogin);
      return;
    }

    let parameters : LoginInterface = {
      email     : this.frmLogin.get('email').value,
      password  : this.frmLogin.get('password').value
    };

    this._authenticationServices.login(parameters).subscribe(res => {
      console.log("response",res);
    },(err:HttpErrorResponse) => {
      console.log("err",err);
    });

  }

  inputValid(name){
    return this.formValidation.inputValidation(this.frmLogin, name);
  }

  showErrors(name):boolean{
    return this.formValidation.showErrors(this.frmLogin, name);
  }

}
