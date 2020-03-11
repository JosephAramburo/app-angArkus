import { Component, OnInit } from '@angular/core';
import { PayrollService } from '@services/payroll.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from '@services/form-validation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionModalComponent } from '@components/modal/question-modal/question-modal.component';
import { ModalPayrollComponent } from '../modals/modal-payroll/modal-payroll.component';
import { PayrollFiltersRequest } from '@interfaces/payroll-filters-request';
import { Payroll } from '@interfaces/payroll';

interface SelectDatePayroll{
  id    : number;
  text  : string;
}

interface FilterPayroll{
  id            : string;
  year          : number;
  month         : number;
  nameEmployer  : string;
  employerId    : string;
  emailEmployer : string;
  status        : number;
}


@Component({
  selector: 'app-my-payroll',
  templateUrl: './my-payroll.component.html',
  styleUrls: ['./my-payroll.component.css']
})
export class MyPayrollComponent implements OnInit {
  title         : string              = 'Mi Nómina';
  id            : number              = 0;
  page          : number              = 0;  
  listData      : Payroll[]           = [];
  dateNow       : Date                = new Date();
  months        : SelectDatePayroll[] = [];
  years         : SelectDatePayroll[] = [];
  filtersToSend : PayrollFiltersRequest = {
    page          : 1,
    emailEmployer : '',
    employerId    : 0,
    id            : 0,
    limit         : 5,
    month         : 0,
    nameEmployer  : '',
    year          : 0,
    status        : 2
  };
  filters : FilterPayroll = {
    id            : '',
    month         : 0,
    year          : 0,
    nameEmployer  : '',
    employerId    : '',
    emailEmployer : '',
    status        : 2
  };

  constructor(
    private _payrollService         : PayrollService,
    private _toastService           : ToastrService,
    private _route                  : ActivatedRoute,
    private _formValidationService  : FormValidationService,
    private modalService            : NgbModal
  ) { }

  ngOnInit(): void {
    this.setInitData();
    this.getParams();
  }

  getParams():void{
    this._route.params.subscribe(params => {
      this.id = typeof(params.id) !== 'undefined'  && params.id !== 'add' ? Number.parseInt(params.id) : 0;      

      if(this.id !== 0){
        this.getPayrollByEmployerId();
      }else{
        this.title                = "Nóminas";
        this.filtersToSend.month  = this.filters.month;
        this.filtersToSend.year   = this.filters.year;
        this.getAllPayrolls();
      }
    });
  }

  getPayrollByEmployerId():void{
    this.listData = [];
    this._payrollService.getbyIdAndYearAndMonth(this.id, this.filters.year, this.filters.month).subscribe(res => {
      res.status = res.statusEmployer;
      this.listData.push(res);
    },(err : HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });
  }

  getAllPayrolls():void{    
    this.listData = [];
    this._payrollService.get(this.filtersToSend).subscribe(res => {
      this.listData = res.payrolls;
    },(err: HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });
  }

  setInitData(){
    this.filters.year   = this.dateNow.getFullYear();
    this.filters.month  = this.dateNow.getMonth()+1;

    this.months = [
      {id: 1,   text: 'ENERO'},
      {id: 2,   text: 'FEBRERO'},
      {id: 3,   text: 'MARZO'},
      {id: 4,   text: 'ABRIL'},
      {id: 5,   text: 'MAYO'},
      {id: 6,   text: 'JUNIO'},
      {id: 7,   text: 'JULIO'},
      {id: 8,   text: 'AGOSTO'},
      {id: 9,   text: 'SEPTIEMBRE'},
      {id: 10,  text: 'OCTUBRE'},
      {id: 11,  text: 'NOVIEMBRE'},
      {id: 12,  text: 'DICIEMBRE'}
    ];

    for(let i = (this.dateNow.getFullYear() - 5); i <= this.dateNow.getFullYear(); i++){
      let yearR : SelectDatePayroll = {
        id    : i,
        text  : i.toString()
      };
      this.years.push(yearR);
    }

    this.years = this.years.sort((a,b) => b.id - a.id);

  }

  private generatePayrollsHistory() : void{
    this._payrollService.generateHistory().subscribe((res:any) => {
      this._toastService.success('Nóminas Generadas Correctamente');
      this.getAllPayrolls()
    },(err: HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });       
  }

  modalQuestion():void{
    const modal = this.modalService.open(QuestionModalComponent, { size: 'md', centered : true });
    modal.componentInstance.title     = 'Nómina';
    modal.componentInstance.question  = '¿Desea generar la nómina del mes y del año en curso?';

    modal.result.then(() => {
      this.generatePayrollsHistory() 
    }).catch(()=> {
    });
  }

  showPayroll(row:Payroll) : void{
    const modal = this.modalService.open(ModalPayrollComponent, { size: 'md', centered : true });
    modal.componentInstance.title     = 'Detalle De Nómina';
    modal.componentInstance.data      = row;

    modal.result.then(() => {
      
    }).catch(()=> {
    });
  }

  changeFilter(flagEmail : boolean =  false, flagName : boolean =  false) : void{
    if(flagEmail && ( this.filters.emailEmployer.length > 0 &&  this.filters.emailEmployer.length < 3))
      return;
    if(flagName && (this.filters.nameEmployer.length > 0 && this.filters.nameEmployer.length < 3))
      return;

    this.filtersToSend.employerId     = this.filters.employerId === '' ? 0 : Number.parseInt(this.filters.employerId);
    this.filtersToSend.nameEmployer   =  this.filters.nameEmployer;
    this.filtersToSend.emailEmployer  =  this.filters.emailEmployer;

    this.getParams();
  }

}
