import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Library
import { LocalStorageModule }       from 'angular-2-local-storage';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { JwtModule, JWT_OPTIONS  }  from '@auth0/angular-jwt';

//SERVICES
import { InterceptorService } from '@services/interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { InitComponent } from './components/init/init.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { QuestionModalComponent } from './components/modal/question-modal/question-modal.component';

export function jwtOptionsFactory(tokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getToken();
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InitComponent,
    LoginComponent,
    NavBarComponent,
    QuestionModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    LocalStorageModule.forRoot({
      prefix      : 'ngApp',
      storageType : 'localStorage'
    }),
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [InterceptorService]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    QuestionModalComponent
  ]
})
export class AppModule { }
