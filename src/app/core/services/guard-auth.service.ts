import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "./token.service";
import {Roles} from "../enums/Roles";

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService {

  constructor(private tokenService: TokenService, private router: Router) { }

  /**
   * Guardian que redirige a las paginas respectivas de su rol si se encuentra logueado e intenta loguearse de nuevo
   */
  public canActiveLogin(): boolean {
    if (this.tokenService.getToken()) {
      this.router.navigateByUrl("/home");
      return false;
    }
    return true;
  }

  /**
   * Guardian que permite acceder a una pagina si se encuentra logueado
   */
  public canActiveWithAuth(): boolean {
    if (!this.tokenService.getToken()) {
      this.router.navigateByUrl("");
      return false;
    }
    return true;
  }

  /**
   * Guardian que permite acceder a una pagina si se encuentra logueado y el rol es admin
   */
  public canActiveWithRolAdmin(): boolean {
    const userRoles = this.tokenService.getInfoToken().rol.map((r) => r.authority);
  
    if (!this.canActiveWithAuth || !userRoles.includes("ADMIN")) {
      this.router.navigateByUrl(this.router.url);
      return false;
    }
    
    return true;
  }

  public canActiveWithRolUser(): boolean {
    if (this.tokenService.getInfoToken().rol.map((r) => r.authority).includes("USER")) {//si no esta autenticado y el rol no es admin devuelve false
      this.router.navigateByUrl(this.router.url);
      return false;
    }
    return true;
  }
}
