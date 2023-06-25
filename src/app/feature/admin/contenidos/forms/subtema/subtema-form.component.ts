import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubtemaService } from 'src/app/core/services/subtema.service';
import { TemaService } from 'src/app/core/services/tema.service';
import { UnidadService } from 'src/app/core/services/unidad.service';
import * as $ from 'jquery'
import Swal from 'sweetalert2';
import { MultimediaService } from 'src/app/core/services/multimedia.service';

@Component({
  selector: 'subtema-form',
  templateUrl: 'subtema-form.component.html'
})
export class SubtemaFormComponent 
{
  
  unidades:any = []; temas:any = [[]]
  unidad:any = new FormControl(['', Validators.required]); temasSelected: any = []
  multimedia:any = []

  form: FormGroup = this.formBuilder.group({
    idSubtema: [''],
    tema: ['', Validators.required],
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    contenido: ['', Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { subtema: any }, private subtemaService: SubtemaService, private temaService: TemaService, private unidadService: UnidadService, private multimediaService: MultimediaService, private formBuilder: FormBuilder) {
   this.unidadService.listar().subscribe(data => {
      this.unidades = data
      
      for(let i = 0; i<data.length; i++){
        if(this.data.subtema != -1 && data[i].idUnidad == this.data.subtema.tema.unidad.idUnidad){
          this.unidadService.getTemas(data[i].idUnidad).subscribe(data => this.temas[i] = this.temasSelected = data)
          this.unidad.value = i
        }
        else this.unidadService.getTemas(data[i].idUnidad).subscribe(data => this.temas[i] = data)

      }
    })
    if (data.subtema != -1){
      this.form.patchValue({
        idSubtema: data.subtema.idSubtema,
        tema: data.subtema.tema.idTema,
        titulo: data.subtema.titulo,
        descripcion: data.subtema.descripcion,
        contenido: data.subtema.contenido
      })
      this.subtemaService.getMultimedia(data.subtema.idSubtema).subscribe(multimedia => this.multimedia = multimedia)
    }
  }

  submitForm(){
    this.multimediaService.guardarTodos(this.multimedia).subscribe()
    this.temaService.encontrar(this.form.get('tema').value).subscribe(data => {      
      this.form.patchValue({tema: data})
      if(this.data.subtema == -1) this.subtemaService.guardar(this.form.value).subscribe(data => window.location.reload())
      else this.subtemaService.editar(this.form.value, this.data.subtema.idSubtema).subscribe(data => window.location.reload())
    })
  }

  addMultimedia(){
    Swal.fire({
      input: 'text',
      inputLabel: 'Titulo',
      inputPlaceholder: 'Ingrese el titulo',
      showCancelButton: true,
      title: "An input!",
    }).then((result) => {
      if (result.isConfirmed) {
        let titulo = result.value;
        Swal.fire({
          input: 'url',
          inputLabel: 'Enlace',
          inputPlaceholder: 'Ingrese la URL',
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            let url = result.value;            
            this.multimedia.push({idMultimedia: null, subtema: this.data.subtema, titulo: titulo, url: url})            
          }
        })
      }
    })
  }

  deleteMultimedia(id:any){
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
        if(this.multimedia[id].idMultimedia != null)
          this.multimediaService.eliminar(this.multimedia[id].idMultimedia).subscribe()
        this.multimedia.splice(id, 1)
      }
    })
  }
  
  changeTemas(){
    let id = this.unidad.value    
    this.temasSelected = this.temas[id]
    this.form.patchValue({tema: this.temas[id].length > 0 ? this.temas[id][0].idTema : null})    
  }
}