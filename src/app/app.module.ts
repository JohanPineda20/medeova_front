import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from 'src/app/app.component'; 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";

//AUTH
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';

//ADMIN

//HOME
import { NavStudentComponent } from './feature/estudiante/nav/nav-student.component';
import { HomeComponent } from './feature/estudiante/home/home.component';
import { UnidadComponent } from './feature/estudiante/unidad/unidad.component'; 
import { TemaComponent } from './feature/estudiante/tema/tema.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavStudentComponent,
    HomeComponent,
    UnidadComponent,
    TemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
