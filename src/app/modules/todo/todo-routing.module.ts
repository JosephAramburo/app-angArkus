import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ListTodoComponent } from './list-todo/list-todo.component';
import { FormTodoComponent } from './form-todo/form-todo.component';

const routes: Routes = [
  { path  : '',       component : ListTodoComponent },
  { path  : ':id',    component : FormTodoComponent },
  { path  : 'add',    component : FormTodoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
