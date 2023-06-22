import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TemaService } from 'src/app/core/services/tema.service';
import { UnidadService } from 'src/app/core/services/unidad.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTabGroup } from '@angular/material/tabs';
import { UnidadFormComponent } from './forms/unidad/unidad-form.component';
import { TemaFormComponent } from './forms/tema/tema-form.component';
import { SubtemaFormComponent } from './forms/subtema/subtema-form.component';
import Swal from 'sweetalert2';
import { SubtemaService } from 'src/app/core/services/subtema.service';

@Component({
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ContenidosAdminComponent{
  unidades: any = []
  temas: any = [[]]
  subtemas: any[] = [[]]

  dataSource: MatTableDataSource<any>[] = []
  columnsToDisplay = [['ID', 'Titulo', 'Temas', 'Actividades', 'Progreso', 'Dificultad'], ['ID', 'Titulo', 'Unidad', 'Subtemas', 'Actividades'], ['ID', 'Titulo', 'Unidad', 'Tema']];
  columnsToDisplayWithExpand = [[...this.columnsToDisplay[0], 'expand'], [...this.columnsToDisplay[1], 'expand'], [...this.columnsToDisplay[2], 'expand']];
  expandedElement: any | null = [[]];

  @ViewChild('paginatorUnidad') paginator: MatPaginator; @ViewChild('paginatorTema') paginator2: MatPaginator; @ViewChild('paginatorSubtema') paginator3: MatPaginator;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  constructor(private subtemaService: SubtemaService, private temaService: TemaService, private unidadService: UnidadService, public dialog:MatDialog) {
    this.cargarUnidades()
  }

  add(){
    if(this.tabGroup.selectedIndex == 0) this.dialog.open(UnidadFormComponent, {data: {unidad: -1}});
    else if(this.tabGroup.selectedIndex == 1) this.dialog.open(TemaFormComponent, {data: {tema: -1}});
    else this.dialog.open(SubtemaFormComponent, {data: {subtema: -1}});
  }

  edit(obj:any) {
   if(this.tabGroup.selectedIndex == 0) this.dialog.open(UnidadFormComponent, {data: {unidad: obj}});
   else if(this.tabGroup.selectedIndex == 1) this.dialog.open(TemaFormComponent, {data: {tema: obj}});
   else this.dialog.open(SubtemaFormComponent, {data: {subtema: obj}});
  }

  delete(obj:any){
    Swal.fire({
      title: '¿Está seguro?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.tabGroup.selectedIndex == 0) this.unidadService.eliminar(obj.idUnidad).subscribe()
        else if(this.tabGroup.selectedIndex == 1) this.temaService.eliminar(obj.idTema).subscribe()
        else this.subtemaService.eliminar(obj.idSubtema).subscribe()
        Swal.fire('Eliminado con éxito!', '', 'success').then(function(){location.reload()})
      }
    })
  }

  filterTable(title:any, id:number) {
    this.dataSource[id].filter = title.trim().toLowerCase();

    if (this.dataSource[id].paginator) this.dataSource[id].paginator.firstPage();
    this.tabGroup.selectedIndex = id
  }

  cargarUnidades() {
    let cnt = 0    
    this.unidadService.listar().subscribe(data => {
      this.unidades = data
      var filas: any = []
      for (let i = 0; i < data.length; i++) {
        filas.push({
          ID: i+1,
          Titulo: data[i].titulo,
          unidad: data[i]
        })
        this.unidadService.getTemas(data[i].idUnidad).subscribe(data => {
          filas[i].Temas = data.length; this.temas[i] = (data)
          filas[i].unidad.temas = data; this.unidades[i].temas = data
          this.cargarTemas(i, cnt)
          cnt += data.length
        })
        this.unidadService.getActividades(data[i].idUnidad).subscribe(tot => {
          filas[i].Actividades = tot.length
          this.unidadService.getActividadesCompletadas(data[i].idUnidad).subscribe(compl => filas[i].Progreso = (compl.length == 0 ? 0 : compl.length * 100 / tot.length) + '%')
        })
        this.unidadService.getpromedioDificultad(data[i].idUnidad).subscribe(data => filas[i].Dificultad = data)
      }
      this.dataSource[0] = new MatTableDataSource(filas)
      this.dataSource[0].paginator = this.paginator;
    })
  }

  cargarTemas(x: number, cnt: number) {
    var filas: any = []
    for (let i = 0; i < this.temas[x].length; i++) {
      filas.push({
        ID: cnt+i+1,
        Unidad: this.temas[x][i].unidad.titulo,
        Titulo: this.temas[x][i].titulo,
        tema: this.temas[x][i]
      })
      this.temaService.getSubtemas(this.temas[x][i].idTema).subscribe(data => {
        filas[i].Subtemas = data.length; this.subtemas[cnt] = data
        filas[i].tema.subtemas = data;
        this.cargarSubtemas(cnt++)
      })
      this.temaService.getActividades(this.temas[x][i].idTema).subscribe(tot => {
        filas[i].Actividades = tot.length; this.temas[x][i].actividades = tot
      })
      if (x != 0) {
        let data = this.dataSource[1].data; data.push(filas[i])
        this.dataSource[1].data = data
      }
    }
    if (x == 0) this.dataSource[1] = new MatTableDataSource(filas)
    this.dataSource[1].paginator = this.paginator2;
  }

  cargarSubtemas(x: number) {
    var filas: any = []
    for (let i = 0; i < this.subtemas[x].length; i++) {
      filas.push({
        ID: this.subtemas[x][i].idSubtema,
        Titulo: this.subtemas[x][i].titulo,
        Unidad: this.subtemas[x][i].tema.unidad.titulo,
        Tema: this.subtemas[x][i].tema.titulo,
        subtema: this.subtemas[x][i]
      })
      if (x != 0) {
        let data = this.dataSource[2].data; data.push(filas[i])
        this.dataSource[2].data = data
      }
    }
    if (x == 0) this.dataSource[2] = new MatTableDataSource(filas)
    this.dataSource[2].paginator = this.paginator3;

  }

  applyFilter(event: Event, id: number) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource[id].filter = filterValue.trim().toLowerCase();
    if (this.dataSource[id].paginator) this.dataSource[id].paginator.firstPage();
  }
}