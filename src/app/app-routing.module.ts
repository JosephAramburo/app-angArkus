import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//COMPONENTS
import { LoginComponent } from '@components/login/login.component';
import { HomeComponent } from '@components/home/home.component';
import { InitComponent } from '@components/init/init.component';
//MODULES
import { TodoModule } from '@modules/todo/todo.module';

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
        data      : {
          module:"Dashboard",
          title: "Dashboard",
          icon:'fa fa-home',
          show:false,
          permission:'app-all'
        }
      },
      {
        path:'todo',
        loadChildren:() => TodoModule
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
