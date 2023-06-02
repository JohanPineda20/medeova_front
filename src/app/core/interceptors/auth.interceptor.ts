import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../services/token.service";
import Swal from 'sweetalert2'

@Injectable()
export class AuthInterceptor implements HttpInterceptor { //interceptar las solicitudes antes de que sean enviadas al servidor.

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    let headers;
    let token = this.tokenService.getToken();

    if (!token) {
      return next.handle(request); //si no hay ningún token de autenticación presente permite que las solicitudes continúen sin ser modificadas. Esto puede ser útil en escenarios donde algunas rutas o endpoints no requieren autenticación y se desea permitir el acceso sin la necesidad de un token.
    }

//para las solicitudes que necesitan llevar un token
    headers = {
      'Authorization': 'Bearer '+token
    }

    let authRequest = request.clone({
      setHeaders: {
        ...headers
      },
    });

    return next.handle(authRequest).pipe(
      catchError((err: HttpErrorResponse) => {//el token es invalido, expiró o no tienes el rol permitido = No tienes permisos
        if (err.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes permisos para acceder a ésta página.'
          })
        }
        return throwError(() => err);
      })
    );
  }
}
