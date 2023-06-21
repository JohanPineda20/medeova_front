import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActividadService } from 'src/app/core/services/actividad.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ActividadAdminComponent } from './form/actividad.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

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
export class ActividadesAdminComponent 
{
  promedio: number = 0
  dataSource: MatTableDataSource<any>;
  columnsToDisplay : string[] = ['ID', 'Titulo', 'Unidad', 'Tema', 'Progreso', 'Dificultad'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];  
  expandedElement: any | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private actividadService: ActividadService, public dialog:MatDialog) {
    this.actividadService.listar().subscribe(data => {  
      var actividades:  any[] = []      
      for(let i = 0; i<data.length; i++){
        var act = data[i]
        
        actividades.push({
          ID: i+1,
          actividad: data[i],
          Titulo: act.titulo,
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

  add(){
    this.dialog.open(ActividadAdminComponent, {data: {actividad: -1}});
  }

  edit(obj:any) {
   this.dialog.open(ActividadAdminComponent, {data: {actividad: obj}});
  }

  delete(obj:any) {
    Swal.fire({
      title: '¿Está seguro de eliminar esta actividad?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.actividadService.eliminar(obj.idActividad).subscribe(data => Swal.fire('Eliminado con éxito!', '', 'success').then(function(){location.reload()}))
      }
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