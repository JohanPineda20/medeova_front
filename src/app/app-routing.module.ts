import { RegisterComponent } from './feature/auth/register/register.component';
import { HomeComponent } from './feature/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feature/auth/login/login.component'; 

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'singup',component: RegisterComponent},
  {path: 'home',component: HomeComponent},
  //{path: 'admin',component: AdminComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
