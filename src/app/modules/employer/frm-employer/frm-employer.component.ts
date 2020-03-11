import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from '@services/form-validation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { EmployerService } from '@services/employer.service';
import { EmployerInterface } from '@interfaces/employer-interface';
import { LocalStorageService } from 'angular-2-local-storage';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

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
  startDate      : NgbDate;

  constructor(
    private _formValidationService  : FormValidationService,
    private _employerService        : EmployerService,
    private _router                 : Router,
    private _toastService           : ToastrService,
    private _route                  : ActivatedRoute,
    private _localStorage           : LocalStorageService,
    private calendar                : NgbCalendar
  ) { 
    this.startDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.createForm();
    this.getParams();
  }

  createForm():void{
    this.frmEmployer = new FormGroup({
      email                 : new FormControl('', Validators.required),
      password              : new FormControl(''),
      role                  : new FormControl('', Validators.required),
      name                  : new FormControl('', Validators.required),
      lastName              : new FormControl('', Validators.required),
      motherLastName        : new FormControl('', Validators.required),
      status                : new FormControl(true, Validators.required),
      admissionDate         : new FormControl(this.calendar.getToday(), Validators.required),
      baseIncome            : new FormControl('', Validators.required),
      breakfastDeduction    : new FormControl('', Validators.required),
      savingsDeduction      : new FormControl('', Validators.required),     
      gasolineCard          : new FormControl('', Validators.required),     
    });        
  }

  getParams():void{
    this._route.params.subscribe(params => {
      this.id = typeof(params.id) !== 'undefined'  && params.id !== 'add' ? Number.parseInt(params.id) : 0;

      if(this.id !== 0){
        this.getById();
        this.type   = 'update';
        this.title  = 'Editar Empleado';
      }else{
        this.frmEmployer.get('password').setValidators(Validators.required)
      }
    });
  }

  getById():void{
    this._employerService.getbyId(this.id).subscribe(res => {
      this.frmEmployer.get('email').setValue(res.email);
      this.frmEmployer.get('password').setValue("");
      this.frmEmployer.get('role').setValue(res.role);
      this.frmEmployer.get('name').setValue(res.name);
      this.frmEmployer.get('lastName').setValue(res.lastName);
      this.frmEmployer.get('motherLastName').setValue(res.motherLastName);
      this.frmEmployer.get('status').setValue(res.status);
      this.frmEmployer.get('baseIncome').setValue(res.baseIncome);
      this.frmEmployer.get('breakfastDeduction').setValue(res.breakfastDeduction);
      this.frmEmployer.get('savingsDeduction').setValue(res.savingsDeduction);
      this.frmEmployer.get('gasolineCard').setValue(res.gasolineCard);
      
      let admissionDate   = new Date(res.admissionDate.toString());      
      this.frmEmployer.get('admissionDate').setValue(new NgbDate(admissionDate.getFullYear(), admissionDate.getMonth(), admissionDate.getDate()-1));

    },(err : HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });
  } 

  save():void{
    if(!this.frmEmployer.valid){
      this._formValidationService.validateAllFormFields(this.frmEmployer);
      return;
    }

    const date        : Date      = new Date();
    const idUser      :number     = Number.parseInt(this._localStorage.get("id"));
    const status      : string    = this.frmEmployer.get('status').value;
    const admiDate    : NgbDate   = this.frmEmployer.get('admissionDate').value;
    const admiDateFor : Date      = new Date();
    admiDateFor.setFullYear(admiDate.year);
    admiDateFor.setMonth(admiDate.month);
    admiDateFor.setDate(admiDate.day);

    const params : EmployerInterface = {
      id                  : this.id,
      email               : this.frmEmployer.get('email').value,
      password            : this.frmEmployer.get('password').value,
      role                : Number.parseInt(this.frmEmployer.get('role').value),
      name                : this.frmEmployer.get('name').value,
      lastName            : this.frmEmployer.get('lastName').value,
      motherLastName      : this.frmEmployer.get('motherLastName').value,
      status              : status ? 1 : 0,
      admissionDate       : admiDateFor,
      baseIncome          : this.frmEmployer.get('baseIncome').value,
      breakfastDeduction  : this.frmEmployer.get('breakfastDeduction').value,
      savingsDeduction    : this.frmEmployer.get('savingsDeduction').value,
      gasolineCard        : this.frmEmployer.get('gasolineCard').value,
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
