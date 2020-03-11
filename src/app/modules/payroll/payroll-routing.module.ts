import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPayrollComponent }   from './my-payroll/my-payroll.component';
import { ListPayrollComponent } from './list-payroll/list-payroll.component';

const routes: Routes = [
  { 
    path      : '',
    component : MyPayrollComponent,
    data      : {
      permissions: {
        only: 'ADMIN',
        redirectTo: '/login'
      }
    } 
  },
  { path  : ':id',    component : MyPayrollComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
