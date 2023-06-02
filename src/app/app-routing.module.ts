import { inject, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './feature/auth/login/login.component'
import { RegisterComponent } from './feature/auth/register/register.component'
import { HomeComponent } from './feature/estudiante/home/home.component'
import { UnidadComponent } from './feature/estudiante/unidad/unidad.component';
import { TemaComponent } from './feature/estudiante/tema/tema.component'
import { ProfileComponent } from './feature/estudiante/profile/profile.component'
import { ActividadComponent } from './feature/estudiante/actividad/actividad.component'
import { GuardAuthService } from './core/services/guard-auth.service'


const routes: Routes = [
  {path: '',
  component: LoginComponent,
  canActivate: [() => inject(GuardAuthService).canActiveLogin()],},
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
  //{path: 'admin',component: AdminComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
