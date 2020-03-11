import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { EmployerRoutingModule } from './employer-routing.module';
import { ListEmployerComponent } from './list-employer/list-employer.component';
import { FrmEmployerComponent } from './frm-employer/frm-employer.component';

@NgModule({
  declarations: [ListEmployerComponent, FrmEmployerComponent],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UiSwitchModule.forRoot({
      // size: 'small',
      // color: 'white',
      // switchColor: '#80FFA2',
      defaultBgColor: 'red',
      // defaultBoColor : 'green',
      checkedLabel: 'ACTIVO',
      uncheckedLabel: 'INACTIVO'
    }),
    NgxMaskModule.forRoot()
  ]
})
export class EmployerModule { }
