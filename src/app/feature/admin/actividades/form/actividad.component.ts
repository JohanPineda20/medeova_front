import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubtemaService } from 'src/app/core/services/subtema.service';
import { TemaService } from 'src/app/core/services/tema.service';
import { UnidadService } from 'src/app/core/services/unidad.service';
import * as $ from 'jquery'
import { ActividadService } from 'src/app/core/services/actividad.service';

@Component({
    selector: 'actividad-form',
    templateUrl: 'actividad.component.html',
})
export class ActividadAdminComponent {
    unidades: any = []; temas: any = [[]]
    unidad: any = new FormControl(['', Validators.required]); temasSelected: any = []

    form: FormGroup = this.formBuilder.group({
        idActividad: [''],
        tema: ['', Validators.required],
        titulo: ['', Validators.required],
        objetivo: ['', Validators.required],
        instrucciones: ['', Validators.required],
        url: ['', Validators.required]
    });

    constructor(@Inject(MAT_DIALOG_DATA) public data: { actividad: any }, private actividadService: ActividadService, private temaService: TemaService, private unidadService: UnidadService, private formBuilder: FormBuilder) {
        this.unidadService.listar().subscribe(data => {
            this.unidades = data
            for (let i = 0; i < data.length; i++) {
                if (this.data.actividad != -1 && data[i].idUnidad == this.data.actividad.tema.unidad.idUnidad) {
                    this.unidadService.getTemas(data[i].idUnidad).subscribe(data => this.temas[i] = this.temasSelected = data)
                    this.unidad.value = i
                }
                else this.unidadService.getTemas(data[i].idUnidad).subscribe(data => this.temas[i] = data)
            }
        })
        if (data.actividad != -1) {
            this.form.patchValue({
                idActividad: data.actividad.idActividad,
                tema: data.actividad.tema.idTema,
                titulo: data.actividad.titulo,
                objetivo: data.actividad.objetivo,
                instrucciones: data.actividad.instrucciones,
                url: data.actividad.url
            })
        }
    }

    submitForm(){
        this.temaService.encontrar(this.form.get('tema').value).subscribe(data => {      
            this.form.patchValue({tema: data})
            if(this.data.actividad == -1) this.actividadService.guardar(this.form.value).subscribe(data=> location.reload())
            else this.actividadService.editar(this.form.value, this.data.actividad.idActividad).subscribe(data=> location.reload())
          })
        
    }

    changeTemas(){
        let id = this.unidad.value    
        this.temasSelected = this.temas[id]
        this.form.patchValue({tema: this.temas[id].length > 0 ? this.temas[id][0].idTema : null})    
      }
}