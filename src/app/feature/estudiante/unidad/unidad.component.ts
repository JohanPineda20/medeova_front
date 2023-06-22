import { Component } from '@angular/core';
import { UnidadService } from 'src/app/core/services/unidad.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as fs from 'fs';
import { FileSaverService } from 'ngx-filesaver';
import { TemaService } from 'src/app/core/services/tema.service';


@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent 
{
  unidad: any = ''
  tema: any = ''

  constructor(private unidadService: UnidadService, private temaService: TemaService, private router: Router, private aRouter: ActivatedRoute, private http: HttpClient, private fileSaverService: FileSaverService) {
    this.unidadService.encontrar(this.aRouter.snapshot.paramMap.get('idUnidad')).subscribe(data => {
      this.unidad = data
      this.unidadService.getTemas(data.idUnidad).subscribe(temas => {
        for (let i = 0; i < temas.length; i++)
          this.temaService.getSubtemas(temas[i].idTema).subscribe(subtemas => temas[i].subtemas = subtemas)
        this.unidad.temas = temas; this.tema = temas[0]
      })
    })
  }

  changeTema(id:number){
    this.tema = this.unidad.temas[id]
  }
}