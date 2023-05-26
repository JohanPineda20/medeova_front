import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AppBaseComponent  {

  constructor(private router: Router) {
    super()
  }

  logout(): void {
    // Eliminar el token de autenticación del local storage, sesión storage o cookies
    localStorage.removeItem('token');

    // Restablecer cualquier otro estado relacionado con la sesión
    // this.isLoggedIn = false;

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigateByUrl("");
  }
}
