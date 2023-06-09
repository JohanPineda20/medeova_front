import DataLabelsPlugin from 'chartjs-plugin-datalabels';;
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartConfiguration } from 'chart.js'

import { ActividadService } from 'src/app/core/services/actividad.service';
import { UnidadService } from 'src/app/core/services/unidad.service';
import { EstudianteService } from 'src/app/core/services/estudiante.service';

const backgroundColors = ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)']
const borderColors = ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)',
  'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)']

@Component({
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit 
{
  // PROGRESO DE ACTIVIDADES
  actividadesTotal: number = 0; actividadesCompletadas: number = 0;
  progresoDoughnutData: ChartData<'doughnut'>

  //PROGRESO POR UNIDAD
  unidades: any = []
  progresoBarData: ChartData<'bar'>
  progresoBarOptions: ChartConfiguration['options']

  //CANTIDAD DE TEMAS POR UNIDAD
  cntTemasBarData: ChartData<'bar'>
  cntTemasBarOptions: ChartConfiguration['options']

  // DIFICULTAD VS CANTIDAD DE ACTIVIDADES POR UNIDAD
  dificultadScatterData: ChartData<'scatter'>
  dificultadScatterOptions: ChartConfiguration['options']

  estudiantes:any = []

  constructor(private actividadService: ActividadService, private unidadService: UnidadService, private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.estudianteService.listar().subscribe(data => this.estudiantes = data)
    this.actividadService.listar().subscribe(tot => {
      this.actividadesTotal = tot.length
      this.actividadService.getCompletadas().subscribe(compl => {
        this.actividadesCompletadas = compl.length
        this.progresoDelCurso()
      })
    })
    this.unidadService.listar().subscribe(data => {
      this.unidades = data
      this.porcentajePorUnidad()
      this.temasPorUnidad()
      this.dificultadVScantidad()
    })
  }

  dificultadVScantidad()
  {
    let labels: any = [];
    let data: any = []
    for (let i = 0; i < this.unidades.length; i++) {
      labels[i] = 'Unidad ' + this.unidades[i].idUnidad;
      this.unidadService.getpromedioDificultad(this.unidades[i].idUnidad).subscribe(avg => {
        this.unidades[i].avg = avg
        data[i] = {x: this.unidades[i].actividades.length, y:avg}
        if (i == this.unidades.length-1) {
          this.dificultadScatterData = {
            labels: labels,
            datasets: [{ data: data, label: '(Cnt actividades, dificultad)', pointRadius:15}]
          }
        }
      })
    }

    this.dificultadScatterOptions = {
      plugins: {
        legend: {
          display: true,
          position: 'left',
        },
      },
      responsive: true,
      scales: {
        x: { min: 0, max: 10 },
        y: {
          min: 0, max: 10
        }
      }
    }
  }

  progresoDelCurso() {
    this.progresoDoughnutData = {
      labels: ['Completas', 'Incompletas'],
      datasets: [{ data: [this.actividadesCompletadas, this.actividadesTotal - this.actividadesCompletadas] }]
    }
  }


  temasPorUnidad() {
    this.cntTemasBarOptions = {
      plugins: {
        legend: { display: true, position: 'bottom' },
        datalabels: {
          anchor: 'end',
          align: 'end'
        }
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
    };

    let labels: any = []; let data: any = []
    for (let i = 0; i < this.unidades.length; i++) {
      labels[i] = 'Unidad ' + this.unidades[i].idUnidad;
      this.unidadService.getTemas(this.unidades[i].idUnidad).subscribe(temas => {
        data[i] = temas.length;
        this.unidades[i].temas = temas
        if (i == this.unidades.length-1) {
          this.cntTemasBarData = {
            labels: labels,
            datasets: [{ data: data, label: 'Cantidad temas', backgroundColor: backgroundColors[2], borderColor: borderColors[2]}]
          }
        }
      })
    }
  }

  porcentajePorUnidad() {
    let labels: any = []; let datas: any = []
    for (let i = 0; i < this.unidades.length; i++) {
      labels.push('Unidad ' + this.unidades[i].idUnidad);
      this.unidadService.getActividades(this.unidades[i].idUnidad).subscribe(tot => {
        this.unidades[i].actividades = tot
        this.unidadService.getActividadesCompletadas(this.unidades[i].idUnidad).subscribe(compl => {
          datas[i] = compl.length == 0 ? 0 : compl.length * 100 / tot.length
          if (i == this.unidades.length-1) {
            this.progresoBarData = {
              labels: labels,
              datasets: [{
                label: 'Porcentaje',
                data: datas,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
              }]
            }
          }
        })
      })
    }
    this.progresoBarOptions = {
      scales: { x: { min: 0, max: 100 } },
      plugins: { legend: { display: false } },
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
    }
  }
}