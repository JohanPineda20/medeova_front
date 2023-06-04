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
  subtemas: any = []
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
    this.temaService.encontrar(this.aRouter.snapshot.paramMap.get('idTema')).subscribe(data => {
      this.temaService.getComentarios(data.idTema).subscribe(data => this.comentarios = data)
      this.temaService.getActividades(data.idTema).subscribe(data => this.actividades = data)
      this.temaService.getSubtemas(data.idTema).subscribe(sub=>{        
        for(let i = 0; i<sub.length; i++)
          sub[i].contenido = sub[i].contenido.replace(/\r\n/g, '<br>')
        this.subtemas = sub        
      })
      this.tema = data; this.unidad = data.unidad;      
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