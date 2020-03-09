import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { MyPayrollComponent } from './my-payroll/my-payroll.component';
import { ListPayrollComponent } from './list-payroll/list-payroll.component';


@NgModule({
  declarations: [MyPayrollComponent, ListPayrollComponent],
  imports: [
    CommonModule,
    PayrollRoutingModule
  ]
})
export class PayrollModule { }
