import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './feature/auth/login/login.component'
import { RegisterComponent } from './feature/auth/register/register.component'
import { HomeComponent } from './feature/estudiante/home/home.component'
import { UnidadComponent } from './feature/estudiante/unidad/unidad.component';
import { TemaComponent } from './feature/estudiante/tema/tema.component'
import { ProfileComponent } from './feature/estudiante/profile/profile.component'
import { ActividadComponent } from './feature/estudiante/actividad/actividad.component'
import { DashboardAdminComponent } from './feature/admin/dashboard/dashboard-admin.component'
import { ActividadesAdminComponent } from './feature/admin/actividades/actividades.component'
import { EstudiantesAdminComponent } from './feature/admin/estudiantes/estudiantes.component'
import { ContenidosAdminComponent } from './feature/admin/contenidos/contenidos.component'
import { ActividadAdminComponent } from './feature/admin/actividades/form/actividad.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'unidad/:idUnidad', component: UnidadComponent },
  { path: 'unidad/:idUnidad/tema/:idTema', component: TemaComponent },
  { path: 'actividad/:idActividad', component: ActividadComponent },
  //{path: 'admin',component: AdminComponent},
  //ADMIN
  { path: 'dashboard', component: DashboardAdminComponent },
  { path: 'actividades', component: ActividadesAdminComponent },
  { path: 'estudiantes', component: EstudiantesAdminComponent },
  { path: 'contenidos', component: ContenidosAdminComponent },
  {path: 'admin/actividad/:idActividad',component: ActividadAdminComponent},
  {path: 'admin/actividad',component: ActividadAdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
