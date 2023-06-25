import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.comonent.css']
})
export class NavAdminComponent implements OnInit {

  menuItems:any[] = []

  constructor(private router:Router, private tokenService: TokenService ) {}

  ngOnInit(): void {
    this.loadMenuItems()
  }

  loadMenuItems(){
    this.menuItems = [
      ["Estadisticas", "bx bx-pie-chart-alt-2 icon", "/dashboard"],
      ["Estudiantes", "bx bx-bar-chart-alt-2 icon", "/estudiantes"],
      ["Actividades", "bx bx-pie-chart-alt-2 icon", "/actividades"],
      ["Contenidos", "bx bx-folder-open icon", "/contenidos"],
      ["Ver Curso", "bx bx-folder-open icon", "/home"],        
    ]
  }

  logout(): void {
    this.tokenService.deleteToken(); //eliminar token de la cookie para colocar guard en false
    this.router.navigateByUrl("/login"); //regresar al login
  }

}
