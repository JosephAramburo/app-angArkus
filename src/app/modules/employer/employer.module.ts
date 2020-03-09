import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { ListEmployerComponent } from './list-employer/list-employer.component';
import { FrmEmployerComponent } from './frm-employer/frm-employer.component';


@NgModule({
  declarations: [ListEmployerComponent, FrmEmployerComponent],
  imports: [
    CommonModule,
    EmployerRoutingModule
  ]
})
export class EmployerModule { }
