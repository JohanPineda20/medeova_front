import { Component } from '@angular/core';
import { JsonService } from 'src/app/core/services/json.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent 
{
  ids: number[] = []
  unidad: any
  tema: any

  constructor(private jsonService: JsonService, private router: Router, private aRouter: ActivatedRoute) {
    this.ids[0] = Number(this.aRouter.snapshot.paramMap.get('idUnidad'))
    this.loadData();
  }

  loadData() {
    this.jsonService.getUnidad(this.ids[0]).subscribe(data => {
        this.unidad = data
        this.changeTema(0)
      }
    );
  }

  changeTema(id:number){
    this.ids[1] = id
    this.jsonService.getTema(this.ids[0], this.ids[1]).subscribe(data => this.tema = data)
  }
}