import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';

import { PayrollRoutingModule } from './payroll-routing.module';
import { MyPayrollComponent } from './my-payroll/my-payroll.component';
import { ListPayrollComponent } from './list-payroll/list-payroll.component';
import { ModalPayrollComponent } from './modals/modal-payroll/modal-payroll.component';


@NgModule({
  declarations: [MyPayrollComponent, ListPayrollComponent, ModalPayrollComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PayrollRoutingModule,
    NgxPermissionsModule.forChild()
  ]
})
export class PayrollModule { }
