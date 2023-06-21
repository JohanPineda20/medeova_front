import { Component } from '@angular/core';
import { ActividadService } from 'src/app/core/services/actividad.service';

@Component({
  selector: 'app-lista-actividad',
  templateUrl: './lista-actividad.component.html',
  styleUrls: ['./lista-actividad.component.css']
})
export class ListaActividadComponent {

  actividades: any = []

  constructor(private actividadService: ActividadService) 
  {   
    this.actividadService.listar().subscribe(data => {
      this.actividades = data
    })
  }
}