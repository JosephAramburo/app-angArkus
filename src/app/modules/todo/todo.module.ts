import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { FormTodoComponent } from './form-todo/form-todo.component';


@NgModule({
  declarations: [ListTodoComponent, FormTodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
