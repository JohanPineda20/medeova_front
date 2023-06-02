import { Injectable } from '@angular/core';
import { getCookie, setCookie } from 'typescript-cookie'
import jwt_decode from "jwt-decode";
import {UsuarioJwtDto} from "../dto/usuarioJwtDto";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {

  }

  public getToken(): string {
    return getCookie("token");
  }

  public saveToken(token: string): void {
    setCookie("token", token, {expires: 1, path: "/"})
  }

  public deleteToken(): void {
    setCookie("token", "", { expires: -1, path: "/" });
  }


  public getInfoToken(): UsuarioJwtDto {
    let infoToken = jwt_decode(getCookie("token"));
    return <UsuarioJwtDto>infoToken;
  }

}
