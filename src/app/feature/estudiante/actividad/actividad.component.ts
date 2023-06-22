import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { TokenService } from 'src/app/core/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent 
{
  estudiante:any = null
  completada:any = false
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { actividad: any }, private tokenService: TokenService, private estudianteService: EstudianteService) {
    if(this.tokenService.getInfoToken().rol[0].authority == "USER"){
      this.estudianteService.get(this.tokenService.getInfoToken().id).subscribe(data => {
        this.estudiante = data
        var id = {
          actividad: this.data.actividad.idActividad,
          usuario: this.estudiante.codigo
        }
        this.estudianteService.isCompletada(id).subscribe(data => this.completada = data == null ? false : true)     
      })
    }
  }

  completar(){
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
                actividad: this.data.actividad,
                dificultad: value,
                comentario: result.value == '' ? null : result.value
              }
              this.estudianteService.completarActividad(detalle).subscribe()
            }else if(result.isDenied){
              var detalle = {
                usuario: this.estudiante,
                actividad: this.data.actividad,
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