import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from '@services/form-validation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { EmployerService } from '@services/employer.service';
import { EmployerInterface } from '@interfaces/employer-interface';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-frm-employer',
  templateUrl: './frm-employer.component.html',
  styleUrls: ['./frm-employer.component.css']
})
export class FrmEmployerComponent implements OnInit {
  frmEmployer     : FormGroup = null;
  statusM         : boolean = true;
  title           : string  = 'Agregar Empleado';
  type            : string  = 'save';
  id              : number;

  constructor(
    private _formValidationService  : FormValidationService,
    private _employerService        : EmployerService,
    private _router                 : Router,
    private _toastService           : ToastrService,
    private _route                  : ActivatedRoute,
    private _localStorage           : LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getParams();
  }

  createForm():void{
    this.frmEmployer = new FormGroup({
      email                 : new FormControl('', Validators.required),
      password              : new FormControl('', Validators.required),
      role                  : new FormControl('', Validators.required),
      name                  : new FormControl('', Validators.required),
      lastName              : new FormControl('', Validators.required),
      motherLastName        : new FormControl('', Validators.required),
      status                : new FormControl(true, Validators.required),
      admissionDate         : new FormControl('', Validators.required),
      baseIncome            : new FormControl('', Validators.required),
      breakfastDeduction    : new FormControl('', Validators.required),
      savingsDeduction      : new FormControl('', Validators.required)      
    });    
  }

  getParams():void{
    this._route.params.subscribe(params => {
      this.id = typeof(params.id) !== 'undefined'  && params.id !== 'add' ? Number.parseInt(params.id) : null;

      if(this.id !== null){
        this.getById();
        this.type   = 'update';
        this.title  = 'Editar Empleado';
      }
    });
  }

  getById():void{
    this._employerService.getbyId(this.id).subscribe(res => {
      // this.frmEmployer.get('description').setValue(res.description);
      // this.frmEmployer.get('status').setValue(res.status);
      
    },(err : HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });
  } 

  save():void{
    if(!this.frmEmployer.valid){
      this._formValidationService.validateAllFormFields(this.frmEmployer);
      return;
    }

    const date  = new Date();
    const idUser = this._localStorage.get("id");

    const params : EmployerInterface = {
      id                  : this.id,
      email               : this.frmEmployer.get('email').value,
      password            : this.frmEmployer.get('password').value,
      role                : Number.parseInt(this.frmEmployer.get('role').value),
      name                : this.frmEmployer.get('name').value,
      lastName            : this.frmEmployer.get('lastName').value,
      motherLastName      : this.frmEmployer.get('motherLastName').value,
      status              : this.frmEmployer.get('status').value,
      admissionDate       : this.frmEmployer.get('admissionDate').value,
      baseIncome          : this.frmEmployer.get('baseIncome').value,
      breakfastDeduction  : this.frmEmployer.get('breakfastDeduction').value,
      savingsDeduction    : this.frmEmployer.get('savingsDeduction').value,
      createdAt           : date,
      createdBy           : Number.parseInt(idUser.toString()),
      updatedAt           : date,
      updatedBy           : Number.parseInt(idUser.toString()),
    };

    this._employerService[this.type](params).subscribe(res => {
      this._toastService.success('Registro guardado correctamente');
      this._router.navigate(['/employer']);
    },(err : HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });

  }

  inputValid(name){
    return this._formValidationService.inputValidation(this.frmEmployer, name);
  }

  showErrors(name):boolean{
    return this._formValidationService.showErrors(this.frmEmployer, name);
  }

}
