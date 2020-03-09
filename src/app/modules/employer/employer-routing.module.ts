import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListEmployerComponent } from './list-employer/list-employer.component';
import { FrmEmployerComponent } from './frm-employer/frm-employer.component';

const routes: Routes = [
  { path  : '',       component : ListEmployerComponent },
  { path  : 'add',    component : FrmEmployerComponent },
  { path  : ':id',    component : FrmEmployerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
