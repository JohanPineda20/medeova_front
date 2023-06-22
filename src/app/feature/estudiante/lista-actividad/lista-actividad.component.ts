import { Component } from '@angular/core';
import { ActividadService } from 'src/app/core/services/actividad.service';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { TokenService } from 'src/app/core/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-actividad',
  templateUrl: './lista-actividad.component.html',
  styleUrls: ['./lista-actividad.component.css']
})
export class ListaActividadComponent {

  actividades: any = []
  completadas: any = []
  estudiante: any = []

  constructor(private actividadService: ActividadService, private estudianteService: EstudianteService, private tokenService: TokenService) 
  {
    if(this.tokenService.getInfoToken().rol[0].authority != "USER"){
      this.estudiante == null
      this.actividadService.listar().subscribe(data => this.actividades = data)
    }else{
      this.estudianteService.get(this.tokenService.getInfoToken().id).subscribe(data => {
        this.estudiante = data
        this.actividadService.listar().subscribe(data => {
          this.actividades = data
          for(let i=0; i<data.length; i++){
            var id = {
              actividad: data[i].idActividad,
              usuario: this.estudiante.codigo
            }
            this.estudianteService.isCompletada(id).subscribe(data => this.completadas[i] = data == null ? false : true)
          }
        })
      })
    }
  }

  completar(actividad:any){
    Swal.fire({
      title: 'Completar',
      input: 'number',
      inputAttributes: {
        min: '1', max: '10'
      },
      inputLabel: 'Digite la dificultad de la actividad',
      showCancelButton: true,
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      preConfirm: (value) => {
        if (value) {
          Swal.fire({
            title: 'Completar',
            input: 'textarea',
            inputLabel: '¿Desea incluir un comentario? Este será visible por el docente',
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: 'Enviar',
            denyButtonText: 'Omitir',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if(result.isConfirmed){
              var detalle = {
                usuario: this.estudiante,
                actividad: actividad,
                dificultad: value,
                comentario: result.value == '' ? null : result.value
              }
              this.estudianteService.completarActividad(detalle).subscribe()
            }else if(result.isDenied){
              var detalle = {
                usuario: this.estudiante,
                actividad: actividad,
                dificultad: value,
                comentario: null
              }
              this.estudianteService.completarActividad(detalle).subscribe()              
            }
            window.location.reload()
          })
        }
      }
    });
  }  
}