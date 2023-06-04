import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TemaService } from 'src/app/core/services/tema.service';
import { UnidadService } from 'src/app/core/services/unidad.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

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

export class ContenidosAdminComponent implements AfterViewInit {
  unidades: any[] = []
  temas: any = [[]]
  subtemas: any[] = [[]]



  dataSource: MatTableDataSource<any>[] = []
  columnsToDisplay = [['ID', 'Titulo', 'Temas', 'Actividades', 'Progreso', 'Dificultad'], ['ID', 'Unidad', 'Titulo', 'Subtemas', 'Actividades'], ['ID', 'Unidad', 'Tema', 'Titulo']];
  columnsToDisplayWithExpand = [[...this.columnsToDisplay[0], 'expand'], [...this.columnsToDisplay[1], 'expand'], [...this.columnsToDisplay[2], 'expand']];
  expandedElement: any | null = [[]];

  @ViewChild('paginatorUnidad') paginator: MatPaginator; @ViewChild('paginatorTema') paginator2: MatPaginator; @ViewChild('paginatorSubtema') paginator3: MatPaginator;
  @ViewChild('sortUnidad') sort: MatSort; //@ViewChild('sortTema') sort2: MatSort;
  selected = 0

  constructor(private temaService: TemaService, private unidadService: UnidadService) {
    this.cargarUnidades()
  }

  ngAfterViewInit() {

  }


  cargarUnidades() {
    let cnt = 0
    this.unidadService.listar().subscribe(data => {
      this.unidades = data
      var filas: any = []
      for (let i = 0; i < data.length; i++) {
        filas.push({
          ID: data[i].idUnidad,
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
      }
      this.dataSource[0] = new MatTableDataSource(filas)
      this.dataSource[0].paginator = this.paginator;
    })
  }

  cargarTemas(x: number, cnt: number) {
    var filas: any = []
    for (let i = 0; i < this.temas[x].length; i++) {
      filas.push({
        ID: this.temas[x][i].idTema,
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
        filas[i].Actividades = tot.length
      })
      if (x != 0) {
        let data = this.dataSource[1].data; data.push(filas[i])
        this.dataSource[1].data = data
      }
    }
    if (x == 0) this.dataSource[1] = new MatTableDataSource(filas)
    this.dataSource[1].paginator = this.paginator2;
    //this.dataSource[1].sort = this.sort2;
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

  prueba() {
    console.log(this.unidades);
    console.log(this.temas);
    console.log(this.subtemas);


  }


  applyFilter(event: Event, id: number) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource[id].filter = filterValue.trim().toLowerCase();

    if (this.dataSource[id].paginator)
      this.dataSource[id].paginator.firstPage();
  }
}