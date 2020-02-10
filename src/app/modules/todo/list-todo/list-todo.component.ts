import { Component, OnInit } from '@angular/core';
import { TodoInterface } from '@interfaces/todo-interface';
import { TodoService } from '@services/todo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from '@services/form-validation.service'

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  listData : TodoInterface[] = [];

  constructor(
    private _todoService            : TodoService,
    private _toastService           : ToastrService,
    private _formValidationService  : FormValidationService
  ) { }

  ngOnInit(): void {
    this.getData();
    // this.setData();
  }

  getData( params : TodoInterface = { status : null} as TodoInterface ):void{
    this.listData = [];
    this._todoService.get(params).subscribe(res => {
      this.listData = res;
    }, (err : HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });
  }

  setData():void{
    let row : TodoInterface = {
      _id         : '1',
      description : 'Description 1',
      status      : true,
      file        : '',
      typeFile    : ''
    };
    this.listData.push(row);

    row = {
      _id         : "2",
      description : "DEscription 2",
      status      : false,
      file        : '',
      typeFile    : ''
    };
    this.listData.push(row);

    row = {
      _id         : "3",
      description : "DEscription 3",
      status      : false,
      file        : '',
      typeFile    : ''
    };
    this.listData.push(row);
  }

}
