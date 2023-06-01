import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.comonent.css']
})
export class NavAdminComponent implements OnInit {

  menuItems:any[] = []

  constructor() { }

  ngOnInit(): void {
    this.loadMenuItems()
  }

  loadMenuItems(){
    this.menuItems = [
      ["Dashboard", "bx bx-home-alt icon", "/dashboard"],
      ["Estudiantes", "bx bx-bar-chart-alt-2 icon", "/estudiantes"],
      ["Actividades", "bx bx-pie-chart-alt-2 icon", "/actividades"],
      ["Contenidos", "bx bx-folder-open icon", "/contenidos"],
      ["Estadisticas", "bx bx-bar-chart-alt-2 icon", "/dashboard"]      
    ]
  }

}
