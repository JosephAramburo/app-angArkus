import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

//COMPONENTS
import { LoginComponent } from '@components/login/login.component';
import { HomeComponent } from '@components/home/home.component';
import { InitComponent } from '@components/init/init.component';
//MODULES
import { TodoModule } from '@modules/todo/todo.module';
import { EmployerModule } from '@modules/employer/employer.module';
import { PayrollModule } from '@modules/payroll/payroll.module';

const routes: Routes = [
  {
    path      : '',
    component : InitComponent,
    children  : [
      {
        path        : '',
        redirectTo  : '/login',
        pathMatch   : 'full',
        data        : {
          show : false,
        }
      },
      {
        path      : 'home',
        component :  HomeComponent,
        canActivate: [NgxPermissionsGuard],
        data      : {
          permissions: {
            only: 'ADMIN',
            redirectTo: '/login'
          }
        }
      },
      {
        path:'employer',
        loadChildren:() => EmployerModule,
        canActivate: [NgxPermissionsGuard],
        data      : {
          permissions: {
            only: 'ADMIN',
            redirectTo: '/login'
          }
        }
      },
      {
        path:'payroll',
        loadChildren:() => PayrollModule
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
