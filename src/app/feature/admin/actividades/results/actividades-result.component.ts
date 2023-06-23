import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ActividadService } from 'src/app/core/services/actividad.service';
import { EstudianteService } from 'src/app/core/services/estudiante.service';

@Component({
  styleUrls: ['./actividades-result.component.css'],
  templateUrl: 'actividades-result.component.html',
})
export class ActividadesResultAdminComponent 
{
  actividad:any
  promedio: any[] = []
  estudiantes:any = [[], []]
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  displayedColumns: string[][] = [['codigo', 'nombre', 'apellido', 'fecha', 'dificultad', 'comentario'], ['codigo', 'nombre', 'apellido',  'estado']];

  @ViewChild('paginatorTodos') paginator0: MatPaginator; @ViewChild('paginatorCompletadas') paginator1: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private actividadService: ActividadService, private estudianteService: EstudianteService, private aRouter: ActivatedRoute) {
    this.actividadService.encontrar(this.aRouter.snapshot.paramMap.get('idActividad')).subscribe(act => {
      this.actividad = act
      this.actividadService.getPorcentaje(act.idActividad).subscribe(data => this.promedio[0] = data)
      this.actividadService.getPromedioDificultad(act.idActividad).subscribe(data => this.promedio[1] = data)
      this.estudianteService.listar().subscribe(data => {
        var datos:any = []        
        for(let i=0; i<data.length; i++){
          datos.push({
            codigo: data[i].codigo,
            nombre: data[i].perNom + ' ' + (data[i].sdoNom==null? '' : data[i].sdoNom ),
            apellido: data[i].perApell + ' ' + (data[i].sdoApell==null? '' : data[i].sdoApell ),
          })
          this.estudianteService.isCompletada({actividad: act.idActividad, usuario:data[i].codigo}).subscribe(result =>{
            if(result == null)
              datos[i].completada = false
            else{
              datos[i].completada = true
              datos[i].fecha = result.createdAt
              datos[i].dificultad = result.dificultad
              datos[i].comentario = result.comentario==null?'':result.comentario
              this.estudiantes[1].push(datos[i])
            }
            this.estudiantes[0].push(datos[i])
            this.dataSource.data = this.estudiantes[0]
          })
        }
        this.dataSource.paginator = this.paginator0
        this.dataSource.sort = this.sort
      })
    })
  }

  onTabSelectionChange(event: MatTabChangeEvent) {
    this.dataSource.filter = ''
    if(event.index == 1){
      this.dataSource.data = this.estudiantes[1]
      this.dataSource.paginator = this.paginator1
    }
    else{
      this.dataSource.data = this.estudiantes[0]
      this.dataSource.paginator = this.paginator0
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  } 

}