import { TokenService } from './../../../core/services/token.service';
import { Component } from '@angular/core';
import { JsonService } from 'src/app/core/services/json.service';
import { UnidadService } from 'src/app/core/services/unidad.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent 
{
  unidades : any= []
  mensajes: any = []

  constructor(private jsonService: JsonService, private unidadService: UnidadService)
  {
    this.jsonService.getJsonData('assets/home.json').subscribe(data => this.mensajes = data);
    this.unidadService.listar().subscribe(data => {
      this.unidades = data
      console.log(this.unidades);
      for(let i = 0; i<data.length; i++)
        this.unidadService.getTemas(data[i].idUnidad).subscribe(data => this.unidades[i].temas = data)
    })
  }
}