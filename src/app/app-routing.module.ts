import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './feature/auth/login/login.component'
import { RegisterComponent } from './feature/auth/register/register.component'
import { HomeComponent } from './feature/estudiante/home/home.component'
import { UnidadComponent } from './feature/estudiante/unidad/unidad.component';
import { TemaComponent } from './feature/estudiante/tema/tema.component'
import { ProfileComponent } from './feature/estudiante/profile/profile/profile.component'

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent},
  {path: 'singup',component: RegisterComponent},
  {path: 'home',component: HomeComponent},
  {path: 'profile',component: ProfileComponent},
  {path: 'unidad/:idUnidad',component: UnidadComponent},
  {path: 'unidad/:idUnidad/tema/:idTema',component: TemaComponent},
  //{path: 'admin',component: AdminComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
