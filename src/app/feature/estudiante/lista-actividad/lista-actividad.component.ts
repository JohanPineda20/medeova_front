import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ActividadService } from 'src/app/core/services/actividad.service';
import { TemaService } from 'src/app/core/services/tema.service';

@Component({
  selector: 'app-lista-actividad',
  templateUrl: './lista-actividad.component.html',
  styleUrls: ['./lista-actividad.component.css']
})
export class ListaActividadComponent {

  actividades: any = []

  constructor(private actividadService: ActividadService, private sanitizer: DomSanitizer) 
  {   
    this.actividadService.listar().subscribe(data => {
      this.actividades = data
    })
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}