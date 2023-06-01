import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from 'src/app/app.component'; 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

//AUTH
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';

//ADMIN
import { DashboardAdminComponent } from './feature/admin/dashboard/dashboard-admin.component';
import { ActividadesAdminComponent } from './feature/admin/actividades/actividades.component';
import { ContenidosAdminComponent } from './feature/admin/contenidos/contenidos.component';
import { EstudiantesAdminComponent } from './feature/admin/estudiantes/estudiantes.component';
import { NavAdminComponent } from './feature/admin/nav/nav-admin.component';

//HOME
import { HomeComponent } from './feature/estudiante/home/home.component';

//ESTUDIANTE
import { NavStudentComponent } from './feature/estudiante/nav/nav-student.component';
import { UnidadComponent } from './feature/estudiante/unidad/unidad.component'; 
import { TemaComponent } from './feature/estudiante/tema/tema.component';
import { ActividadComponent } from './feature/estudiante/actividad/actividad.component'; 
import { ProfileComponent } from './feature/estudiante/profile/profile.component';


// icons

//Import all material modules
import { ScriptsService } from './core/services/scripts.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavStudentComponent,
    HomeComponent,
    UnidadComponent,
    TemaComponent,
    ActividadComponent,
    ProfileComponent,
    DashboardAdminComponent,
    NavAdminComponent,
    EstudiantesAdminComponent,
    ContenidosAdminComponent,
    ActividadesAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgChartsModule
  ],
  providers: [
    ScriptsService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true,      
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
