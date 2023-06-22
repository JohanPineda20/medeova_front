import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from 'src/app/app.component'; 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {register} from 'swiper/element/bundle'; register();
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

//ANGULAR MATERIAL
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon'
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select'
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//AUTH
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';

//ADMIN
import { ProfileAdminComponent } from './feature/admin/profile/profile-admin.component';
import { DashboardAdminComponent } from './feature/admin/dashboard/dashboard-admin.component';
import { ActividadesAdminComponent } from './feature/admin/actividades/actividades.component';
import { ContenidosAdminComponent } from './feature/admin/contenidos/contenidos.component';
import { EstudiantesAdminComponent } from './feature/admin/estudiantes/estudiantes.component';
import { NavAdminComponent } from './feature/admin/nav/nav-admin.component';
import { ActividadAdminComponent } from './feature/admin/actividades/form/actividad.component';
import { UnidadFormComponent } from './feature/admin/contenidos/forms/unidad/unidad-form.component';
import { TemaFormComponent } from './feature/admin/contenidos/forms/tema/tema-form.component';
import { SubtemaFormComponent } from './feature/admin/contenidos/forms/subtema/subtema-form.component';

//HOME
import { NavStudentComponent } from './feature/estudiante/nav/nav-student.component';
import { HomeComponent } from './feature/estudiante/home/home.component';
import { UnidadComponent } from './feature/estudiante/unidad/unidad.component'; 
import { TemaComponent } from './feature/estudiante/tema/tema.component';
import { ActividadComponent } from './feature/estudiante/actividad/actividad.component'; 
import { ProfileComponent } from './feature/estudiante/profile/profile.component';
import { ListaActividadComponent } from './feature/estudiante/lista-actividad/lista-actividad.component';

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
    ProfileAdminComponent,
    ActividadesAdminComponent,
    NavAdminComponent,
    DashboardAdminComponent,
    ContenidosAdminComponent,
    EstudiantesAdminComponent,
    ActividadAdminComponent,
    ListaActividadComponent,
    UnidadFormComponent,
    TemaFormComponent,
    SubtemaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
