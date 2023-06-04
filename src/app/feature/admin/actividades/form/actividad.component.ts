import { Component, OnInit } from '@angular/core';
import { ActividadService } from 'src/app/core/services/actividad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    styleUrls: ['./actividad.component.css'],
    templateUrl: 'actividad.component.html',
})
export class ActividadAdminComponent implements OnInit {
    id:any
    actividad: any;
    form!: FormGroup;

    constructor(private actividadService: ActividadService, private aRouter: ActivatedRoute, private formBuilder: FormBuilder) { }

    ngOnInit(): void 
    {
        this.form = this.formBuilder.group({
            idActividad: ['', Validators.required],
            tipoActividad: ['', Validators.required],
            tema: ['', Validators.required],
            titulo: ['', Validators.required],
            objetivo: ['', Validators.required],
            instrucciones: ['', Validators.required],
            url: ['', Validators.required]
        });

        this.id = this.aRouter.snapshot.paramMap.get('idActividad')
        if(this.id != null){
            this.actividadService.encontrar(this.id).subscribe(data =>{
                this.actividad = data
                this.form.patchValue({
                    idActividad: data.idActividad,
                    tipoActividad: data.tipoActividad.idTipo,
                    tema: data.tema.idTema,
                    titulo: data.titulo,
                    objetivo: data.objetivo.idMarca,
                    instrucciones: data.instrucciones,
                    url: data.url
                });
            })            
        }        
    }
}