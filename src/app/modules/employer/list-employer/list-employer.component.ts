import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from '@services/form-validation.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployerInterface } from '@interfaces/employer-interface';
import { QuestionModalComponent } from '@components/modal/question-modal/question-modal.component';
import { EmployerFiltersRequestInterface } from '@interfaces/employer-filters-request-interface';
import { EmployerFiltersResponseInterface } from '@interfaces/employer-filters-response-interface';
import { EmployerService } from '@services/employer.service';

@Component({
  selector: 'app-list-employer',
  templateUrl: './list-employer.component.html',
  styleUrls: ['./list-employer.component.css']
})
export class ListEmployerComponent implements OnInit {
  listData  : EmployerInterface[] = [];
  page      : number              = 1;
  countData : number              = 0;

  filters   : EmployerFiltersRequestInterface    = {
    id            : 0,
    email         : "",
    name          : "",
    role          : 0,
    status        : 2,
    page          : 1
  };

  constructor(
    private _toastService           : ToastrService,
    private _formValidationService  : FormValidationService,
    private modalService            : NgbModal,
    private _employerService        : EmployerService
  ) { }

  ngOnInit(): void {
    this.getData(this.filters);
  }

  getData( params : EmployerFiltersRequestInterface ):void{
    this.listData = [];
    this._employerService.get(params).subscribe(res => {
      this.listData   = res.employers;
      this.countData  = res.count;
    }, (err : HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });
  }

  deleteRow(id : string):void{
    this._employerService.delete(Number.parseInt(id)).subscribe(res => {
      this._toastService.success('Registro eliminado correctamente');
      this.getData(this.filters);
    },(err : HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });
  }

  changeFilter(isName : boolean = false, isEmail : boolean = false):void{    
    if(isName && (this.filters.name.length > 0 && this.filters.name.length < 3))
      return;
    if(isEmail && (this.filters.email.length > 0 && this.filters.email.length < 3))
      return;

    this.pageChange();
  }

  pageChange():void{
    // const filters : TodoInterface = {
    //   page        : this.page,
    //   description : this.filters.description,
    //   file        : null,
    //   status      : this.filters.status.toString() === 'null' ? null : Boolean(JSON.parse(this.filters.status)),
    //   _id         : null,
    //   typeFile    : null
    // };
    this.filters.page = this.page;
    this.getData(this.filters);
  }

  delete(_id : string):void{
    const modal = this.modalService.open(QuestionModalComponent, { size: 'md', centered : true });
    modal.componentInstance.title     = 'Empleados';
    modal.componentInstance.question  = '¿Desea inactivar el registro?';

    modal.result.then(() => {
      this.deleteRow(_id);
    }).catch(()=> {
    });
  }

}
