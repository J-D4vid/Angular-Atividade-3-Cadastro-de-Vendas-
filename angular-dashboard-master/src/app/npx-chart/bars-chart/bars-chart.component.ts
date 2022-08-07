import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke
} from "ng-apexcharts";
import { Carteira } from 'src/app/home/carteira';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-bars-chart',
  templateUrl: './bars-chart.component.html',
  styleUrls: ['./bars-chart.component.css']
})

export class BarsChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
  total: number = 0
  entradas: number = 0
  saidas: number = 0
  valores: Carteira[] = [];
  Quantidade: number = 0

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Entrada",
          data: [0]
        },
        {
          name: "Saída",
          data: [0]
        },
        {
          name: "total",
          data: [0]
        }
      ],
      chart: {
        type: "bar",
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: false,
        offsetX: -6,
        style: {
          fontSize: "20px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: ['Entrada', 'Saída','total']
      }
    };
  }
  ngOnInit() {
    this.populateGraph()
    
    setInterval(() => this.populateGraph(), 5000)
    
  }
  
  populateGraph(){
    
    this.valores = JSON.parse(localStorage.getItem("carteira"))


    if(this.valores != null){

      this.entradas = 0
      this.saidas = 0
      this.Quantidade = 0
      this.total = 0
  
      this.valores.map(res => {
        if (res.caixa === 'Saída') {
          this.saidas += res.valor * res.Quantidade
          this.total = this.entradas - this.saidas
        } else {
          this.entradas = this.entradas + res.valor * res.Quantidade
          this.total = this.entradas - this.saidas
        
        }
      })
  
      this.chartOptions.series = [{
        name: "Entrada",
        data: [this.entradas]
      },
      {
        name: "Saída",
        data: [this.saidas]
      },
      {
        name: "Total",
        data: [this.total]
      }
    ]
    }

  }
}
