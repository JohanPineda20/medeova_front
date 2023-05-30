import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TemaService } from 'src/app/core/services/tema.service';
import { ActividadService } from 'src/app/core/services/actividad.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-tema',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent 
{
  actividad: any = ''
  tema: any = ''
  

  constructor(private temaService: TemaService, private actividadService: ActividadService, private aRouter: ActivatedRoute, private sanitizer: DomSanitizer) 
  {   
    this.actividadService.encontrar(this.aRouter.snapshot.paramMap.get('idActividad')).subscribe(data => {
      this.actividad = data
      this.tema = data.tema
    })
  }

  

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}