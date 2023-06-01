import { Component, OnInit } from '@angular/core';
const ADMIN_NAME = "ROLE_ADMIN";

import { ChartData, ChartConfiguration, ChartType, ChartOptions} from 'chart.js'
import DataLabelsPlugin from 'chartjs-plugin-datalabels';;


@Component({  
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})

export class DashboardAdminComponent implements OnInit
{
  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
      labels:  [ 'Completas', 'Incompletas'],
      datasets: [{ data: [ 35, 75 ] }]
    };

  //BAR
  public labels = ['Unidad 1', 'Unidad 2', 'Unidad 3', 'Unidad 4', 'Unidad 5']
  data = {
  labels: this.labels,
  datasets: [{
    
    label: 'Porcentaje',
    data: [65, 100, 80, 81, 100],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
  
}
public options: ChartOptions ={
  plugins: {
    legend: {
      display: false,
    },
  },
    indexAxis: 'y',
      responsive: false,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
  }



  //OTRA BARRA
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  
  public barChartData: ChartData<'bar'> = {
    labels: [ 'Unidad 1', 'Unidad 2', 'Unidad 3', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [ 5, 9, 8, 1, 6, 5, 4 ], label: 'Cantidad temas' },
    ]
  };

  public options_: ChartOptions ={
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
  }



  // scatter
  public scatterChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
    },
    responsive: true,
    scales: {
      x: {min: 0, max: 10},
      y: {
        min: 0, max:10
      }
    },
    
  };
  public scatterChartLabels: string[] = [ 'Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running' ];

  public scatterChartData: ChartData<'scatter'> = {
    labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 8 },
          { x: 4, y: 4 },
          { x: 5, y: 1 },
        ],
        label: 'Series A',
        pointRadius: 15,
      },
    ]
  };




  constructor(){}

  ngOnInit(): void {}

}
