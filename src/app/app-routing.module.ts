import { inject, NgModule } from '@angular/core'
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
import { ListaActividadComponent } from './feature/estudiante/lista-actividad/lista-actividad.component'
import { GuardAuthService } from './core/services/guard-auth.service'
import { ProfileAdminComponent } from './feature/admin/profile/profile-admin.component'

const routes: Routes = [
  {path: '',
  component: LoginComponent,
  canActivate: [() => inject(GuardAuthService).canActiveWithAuth()],},
  {path: 'login',
  component: LoginComponent,
  canActivate: [() => inject(GuardAuthService).canActiveLogin()]},
  {path: 'singup',
  component: RegisterComponent,
  canActivate: [() => inject(GuardAuthService).canActiveLogin()]},
  {path: 'home',
  component: HomeComponent, 
  canActivate: [() => inject(GuardAuthService).canActiveWithAuth()]},
  {path: 'profile',
  component: ProfileComponent,
  canActivate: [() => inject(GuardAuthService).canActiveWithAuth()]},
  {path: 'unidad/:idUnidad',
  component: UnidadComponent,
  canActivate: [() => inject(GuardAuthService).canActiveWithAuth()]},
  {path: 'unidad/:idUnidad/tema/:idTema',
  component: TemaComponent,
  canActivate: [() => inject(GuardAuthService).canActiveWithAuth()]},
  {path: 'actividad/:idActividad',
  component: ActividadComponent,
  canActivate: [() => inject(GuardAuthService).canActiveWithAuth()]},
  { path: 'listaractividades',
  component: ListaActividadComponent,
  canActivate: [() => inject(GuardAuthService).canActiveWithAuth()]},
  
  //ADMIN
  { path: 'myprofile', component: ProfileAdminComponent,
  canActivate: [() => inject(GuardAuthService).canActiveWithRolAdmin()]},
  { path: 'dashboard', component: DashboardAdminComponent,
  canActivate: [() => inject(GuardAuthService).canActiveWithRolAdmin()]},
  { path: 'actividades', component: ActividadesAdminComponent,
  canActivate: [() => inject(GuardAuthService).canActiveWithRolAdmin()]},
  { path: 'estudiantes', component: EstudiantesAdminComponent,
  canActivate: [() => inject(GuardAuthService).canActiveWithRolAdmin()]},
  { path: 'contenidos', component: ContenidosAdminComponent,
  canActivate: [() => inject(GuardAuthService).canActiveWithRolAdmin()]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
