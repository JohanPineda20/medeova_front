import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TemaService } from 'src/app/core/services/tema.service';
import { UnidadService } from 'src/app/core/services/unidad.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent 
{
  unidad: any = ''
  tema: any = ''
  comentarios: any = []
  actividades: any = []
  usuario = {
    "codigo": "1151910",
     "perNom": "PAULA",
     "sdoNom": "VALENTINA",
     "perApell": "RICO",
     "sdoApell": "LINDARTE",
     "email": "paulavalentinarlin@ufps.edu.co",
     "clave": "12345"
  }
  

  constructor(private temaService: TemaService, private unidadService: UnidadService, private aRouter: ActivatedRoute, private sanitizer: DomSanitizer) 
  {   
    this.unidadService.encontrar(this.aRouter.snapshot.paramMap.get('idUnidad')).subscribe(data => this.unidad = data)
    this.temaService.encontrar(this.aRouter.snapshot.paramMap.get('idTema')).subscribe(data => {
      this.tema = data
      this.temaService.getComentarios(data.idTema).subscribe(data => this.comentarios = data)
      this.temaService.getActividades(data.idTema).subscribe(data => this.actividades = data)
    })
  }

  addComentario(){
    const comment = $("#commentInput").val()
    var c = {
      "tema": this.tema,
      "usuario": this.usuario,
      "comentario": comment
    }
    this.temaService.addComentario(this.tema.idTema, c).subscribe(data => this.temaService.getComentarios(this.tema.idTema).subscribe(data => this.comentarios = data))
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}