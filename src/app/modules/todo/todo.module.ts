import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UiSwitchModule } from 'ngx-ui-switch';

import { TodoRoutingModule } from './todo-routing.module';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { FormTodoComponent } from './form-todo/form-todo.component';


@NgModule({
  declarations: [ListTodoComponent, FormTodoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoRoutingModule,
    NgbModule,
    UiSwitchModule.forRoot({
      // size: 'small',
      // color: 'white',
      // switchColor: '#80FFA2',
      defaultBgColor: 'red',
      // defaultBoColor : 'green',
      checkedLabel: 'ACTIVO',
      uncheckedLabel: 'INACTIVO'
    })
  ]
})
export class TodoModule { }
