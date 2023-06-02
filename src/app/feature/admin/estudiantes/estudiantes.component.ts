import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { UnidadService } from 'src/app/core/services/unidad.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EstudiantesAdminComponent implements AfterViewInit 
{
  unidades: any = [[]]
  dataSource: MatTableDataSource<any>;
  columnsToDisplay : string[] = ['Codigo', 'Nombre', 'Email', 'Progreso'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];  
  expandedElement: Data | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private estudianteService: EstudianteService, private unidadService: UnidadService) {}

  ngAfterViewInit() {
    this.estudianteService.listar().subscribe(data => {  
      var filas:  Data[] = []
      for(let i = 0; i<data.length; i++){
        var est = data[i]
        filas.push({
          estudiante: est,
          Codigo: est.codigo,
          Nombre: est.perNom+(est.sdoNom != null ?' '+est.sdoNom:'')+' '+est.perApell +' '+(est.sdoApell != null ? est.sdoApell:''),
          Email: est.email,
          Progreso: '0',
          Unidades: [] = [[]]
        })
        this.estudianteService.getProgreso(est.codigo).subscribe(data => filas[i].Progreso = data + '%')
      }

      this.unidadService.listar().subscribe(data => {
        this.unidades = data;
        for(let i = 0; i<filas.length; i++){
          for(let j = 0; j<data.length; j++){
            console.log(filas[i].Codigo, data[j].idUnidad);
            filas[i].Unidades[j] = []
            filas[i].Unidades[j][0] = j+1;
            this.estudianteService.getProgresoByUnidad(filas[i].Codigo, data[j].idUnidad).subscribe(dat => filas[i].Unidades[j][1] = dat == null ? 0 : dat)            
          }
        }        
      })
      this.dataSource = new MatTableDataSource(filas)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })    
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  } 
}

export interface Data {
  estudiante: any;
  Codigo: number;
  Nombre: String;
  Email: String;
  Progreso: String;
  Unidades: any[];
}