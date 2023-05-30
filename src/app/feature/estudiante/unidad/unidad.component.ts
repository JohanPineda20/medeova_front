import { Component } from '@angular/core';
import { UnidadService } from 'src/app/core/services/unidad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as fs from 'fs';
import { FileSaverService } from 'ngx-filesaver';


@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent 
{
  unidad: any = ''
  tema: any = ''

  constructor(private unidadService: UnidadService, private router: Router, private aRouter: ActivatedRoute, private http: HttpClient, private fileSaverService: FileSaverService) {
    this.unidadService.encontrar(this.aRouter.snapshot.paramMap.get('idUnidad')).subscribe(data =>{
      this.unidad = data
      this.tema = this.unidad.temas[0]
    })
  }

  getTextFile() { 
    this.http.get('assets/texto.txt', { responseType: 'text' }) 
      .subscribe(data => { 
        console.log(data)
        console.log(typeof data)
        //this.fileSaverService.save((<any>data), 'assets/foo.txt');
        /*const fileContent = data;
        const file = new Blob([fileContent], { type: 'text/plain' });
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = 'foo.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);*/
      }); 
  } 

  changeTema(id:number){
    this.tema = this.unidad.temas[id]
  }
}