import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent 
{
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { actividad: any }) {}

  completar(){
    Swal.fire({
      title: 'Completar',
      input: 'number',
      inputAttributes: {
        min: '1', max: '10'
      },
      inputLabel: 'Digite la dificultad de la actividad',
      showCancelButton: true,
      confirmButtonText: 'Completar',
      cancelButtonText: 'Cancelar',
      preConfirm: (value) => {
        if (value) {
          console.log('Entered number:', value);
        }
      }
    });
  }

  
}