import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnidadService } from 'src/app/core/services/unidad.service';

@Component({
  selector: 'unidad-form',
  templateUrl: 'unidad-form.component.html'
})
export class UnidadFormComponent {
  form: FormGroup = this.formBuilder.group({
    idUnidad: [''],
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { unidad: any }, private unidadService: UnidadService, private formBuilder: FormBuilder) {
    if (data.unidad != -1)
      this.form.patchValue({
        idUnidad: data.unidad.idUnidad,
        titulo: data.unidad.titulo,
        descripcion: data.unidad.descripcion
      })
  }

  submitForm(){
    if(this.data.unidad == -1) this.unidadService.guardar(this.form.value).subscribe(data=> location.reload());
    else this.unidadService.editar(this.form.value, this.data.unidad.idUnidad).subscribe(data=> location.reload());
  }
}