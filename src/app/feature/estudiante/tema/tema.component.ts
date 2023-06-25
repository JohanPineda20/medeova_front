import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TemaService } from 'src/app/core/services/tema.service';
import * as $ from 'jquery'
import { ActividadComponent } from '../actividad/actividad.component';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/core/services/token.service';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import Swal from 'sweetalert2';
import { ComentarioService } from 'src/app/core/services/comentario.service';

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
  usuario: any
  

  constructor(private temaService: TemaService, private aRouter: ActivatedRoute, private dialog: MatDialog, private sanitizer: DomSanitizer, private tokenService: TokenService, private estudianteService: EstudianteService, private comentarioService: ComentarioService) 
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
    this.estudianteService.encontrar(this.tokenService.getInfoToken().id).subscribe(response => {
      this.usuario = response;
    });
  }

  addComentario(){
    Swal.fire({
      title: '¿Publicar comentario?',
      text: "Otros estudiantes y docentes podrán verlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        if($("#commentInput").val() != ''){
          var c: any = {
            idComentario: null,
            tema: this.tema,
            usuario: this.usuario,
            comentario: $("#commentInput").val()
          }
          this.comentarioService.guardar(c).subscribe(data => 
            this.comentarioService.encontrar(data.idComentario).subscribe(c => this.comentarios.push(c))
          )
        }
        $("#commentInput").val('')
      }
    })
  }

  deleteComentario(id:any){
    Swal.fire({
      title: '¿Está seguro?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.comentarioService.eliminar(this.comentarios[id].idComentario).subscribe(data => 
          Swal.fire('Eliminado con éxito!', '', 'success')
          .then(() => {
            this.comentarios.splice(id, 1)
          })
        )
      }
    })
  }

  verActividad(actividad:any){
    this.dialog.open(ActividadComponent, {data: {actividad: actividad}});
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}