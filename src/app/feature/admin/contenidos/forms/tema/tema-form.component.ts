import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemaService } from 'src/app/core/services/tema.service';
import { UnidadService } from 'src/app/core/services/unidad.service';

@Component({
  selector: 'tema-form',
  templateUrl: 'tema-form.component.html'
})
export class TemaFormComponent {
  unidades:any = []
  form: FormGroup = this.formBuilder.group({
    idTema: [''],
    unidad: ['', Validators.required],
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { tema: any }, private temaService: TemaService, private unidadService: UnidadService, private formBuilder: FormBuilder) {
    this.unidadService.listar().subscribe(data => this.unidades = data)
    if (data.tema != -1){
      this.form.patchValue({
        idTema: data.tema.idTema,
        unidad: data.tema.unidad.idUnidad,
        titulo: data.tema.titulo,
        descripcion: data.tema.descripcion
      })      
    }
  }

  submitForm(){
    this.unidadService.encontrar(this.form.get('unidad').value).subscribe(data => {
      this.form.patchValue({unidad: data})
      if(this.data.tema == -1) this.temaService.guardar(this.form.value).subscribe(data=> location.reload())
      else this.temaService.editar(this.form.value, this.data.tema.idTema).subscribe(data=> location.reload())
    })
  }
}