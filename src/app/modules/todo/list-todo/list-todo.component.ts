import { Component, OnInit } from '@angular/core';
import { TodoInterface } from '@interfaces/todo-interface';
import { TodoService } from '@services/todo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from '@services/form-validation.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionModalComponent } from '@components/modal/question-modal/question-modal.component';

interface FiltersTable{
  description : string;
  status      : string;
}

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  listData  : TodoInterface[] = [];
  page      : number          = 1;
  countData : number          = 0;
  filters   : FiltersTable    = {
    description : '',
    status      : 'null'
  };

  constructor(
    private _todoService            : TodoService,
    private _toastService           : ToastrService,
    private _formValidationService  : FormValidationService,
    private modalService            : NgbModal
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData( params : TodoInterface = { status : null, page : this.page} as TodoInterface ):void{
    this.listData = [];
    this._todoService.get(params).subscribe(res => {
      this.listData = res.data;
      this.countData = res.count;
    }, (err : HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });
  }

  deleteRow(_id : string):void{
    this._todoService.delete(_id).subscribe(res => {
      this._toastService.success('Registro eliminado correctamente');
      this.getData();
    },(err : HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });
  }

  changeFilter(isDescription : boolean = false):void{
    if(isDescription && this.filters.description.length < 3)
      return;

    this.pageChange();
  }

  pageChange():void{
    const filters : TodoInterface = {
      page        : this.page,
      description : this.filters.description,
      file        : null,
      status      : this.filters.status.toString() === 'null' ? null : Boolean(JSON.parse(this.filters.status)),
      _id         : null,
      typeFile    : null
    };
    this.getData(filters);
  }

  delete(_id : string):void{
    const modal = this.modalService.open(QuestionModalComponent, { size: 'md', centered : true });
    modal.componentInstance.title     = 'TODO';
    modal.componentInstance.question  = '¿Desea inactivar el registro?';

    modal.result.then(() => {
      this.deleteRow(_id);
    }).catch(()=> {
    });
  }

}
