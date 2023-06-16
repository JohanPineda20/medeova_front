import { ProfileService } from './../../../core/services/profile.service';
import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TemaService } from 'src/app/core/services/tema.service';
import { UnidadService } from 'src/app/core/services/unidad.service';
import * as $ from 'jquery'
import { TokenService } from 'src/app/core/services/token.service';
import { EstudianteDto } from 'src/app/core/dto/estudianteDto';

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
  usuario: EstudianteDto
  

  constructor(private temaService: TemaService, private unidadService: UnidadService, private aRouter: ActivatedRoute, private sanitizer: DomSanitizer, private tokenService: TokenService, private profileService: ProfileService) 
  {   
    this.temaService.encontrar(this.aRouter.snapshot.paramMap.get('idTema')).subscribe(data => {
      this.temaService.getComentarios(data.idTema).subscribe(data => this.comentarios = data)
      this.temaService.getActividades(data.idTema).subscribe(data => this.actividades = data)
      this.temaService.getSubtemas(data.idTema).subscribe(sub => {this.subtemas = sub; console.log(sub);})
      this.tema = data; 
      this.unidad = data.unidad;
    })
    this.profileService.getEstudiante(this.tokenService.getInfoToken().id).subscribe(response => {
      this.usuario = response;
    });
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