import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActividadService } from 'src/app/core/services/actividad.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  styleUrls: ['./actividades.component.css'],
  templateUrl: 'actividades.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ActividadesAdminComponent implements AfterViewInit 
{
  promedio: number = 0
  dataSource: MatTableDataSource<any>;
  columnsToDisplay : string[] = ['ID', 'Titulo', 'Tipo', 'Unidad', 'Tema', 'Progreso', 'Dificultad'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];  
  expandedElement: any | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private actividadService: ActividadService, private aRoute: ActivatedRoute) {}

  ngAfterViewInit() {
    this.aRoute.params.subscribe((params:Params) =>{
      if(params['id']) console.log("Sí hay ID");
      
    })
    this.actividadService.listar().subscribe(data => {  
      var actividades:  any[] = []
      for(let i = 0; i<data.length; i++){
        var act = data[i]
        actividades.push({
          ID: i+1,
          actividad: data[i],
          Titulo: act.titulo,
          Tipo: act.tipoActividad.nombre,
          Unidad: act.tema.unidad.titulo,
          Tema: act.tema.titulo,
          Progreso: '0',
          Dificultad: 0
        })
        this.actividadService.getPorcentaje(act.idActividad).subscribe(dat => {actividades[i].Progreso = dat+'%'; this.promedio+=dat; if(i == data.length-1) this.promedio/=i+1})
        this.actividadService.getPromedioDificultad(act.idActividad).subscribe(data => actividades[i].Dificultad = data != null ? data: 'Indefinido')
      }
      this.dataSource = new MatTableDataSource(actividades)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })    
  }

  calcularPromedio(valor:number){
    this.promedio += valor  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  } 
}