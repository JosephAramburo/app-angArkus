import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from '@services/form-validation.service';

@Component({
  selector: 'app-form-todo',
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.css']
})
export class FormTodoComponent implements OnInit {
  frmTodo : FormGroup = null;
  title   : string  = 'Agregar TODO';
  type    : string  = 'save';

  constructor(
    private _formValidationService : FormValidationService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm():void{
    this.frmTodo = new FormGroup({
      description : new FormControl('', Validators.required),
      status      : new FormControl('', Validators.required),
      image       : new FormControl('', Validators.required)
    });
  }

  inputValid(name){
    return this._formValidationService.inputValidation(this.frmTodo, name);
  }

  showErrors(name):boolean{
    return this._formValidationService.showErrors(this.frmTodo, name);
  }

}
