import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-nav-student',
  templateUrl: './nav-student.component.html',
  styleUrls: ['./nav-student.component.css']
})
export class NavStudentComponent {

  public username: string

  constructor(private router:Router, private tokenService:TokenService){
    this.username=this.tokenService.getInfoToken().sub
  }

  logout(): void {
    this.tokenService.deleteToken(); //eliminar token de la cookie para colocar guard en false
    this.router.navigateByUrl(""); //regresar al login
  }
}
