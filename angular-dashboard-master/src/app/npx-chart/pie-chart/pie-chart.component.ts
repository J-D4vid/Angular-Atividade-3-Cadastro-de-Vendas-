import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import { Carteira } from 'src/app/home/carteira';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit{

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  entradas: number = 0
  saidas: number = 0
  Quantidade: number = 0
  valores: Carteira[] = []
  total: number = 0;

  constructor() {
    this.chartOptions = {
      series:[
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
        width: 520,
        type: "pie",
      },
      labels: ["Entrada", "Saída","total"],
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              width: 430
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(){
    this.populateChart()

    setInterval(() => {
      this.populateChart()
    }, 5000)
  }

  populateChart(){
    
    this.valores = JSON.parse(localStorage.getItem("carteira"))

    console.log(this.valores)

    if(this.valores != null){
      this.entradas = 0
      this.saidas = 0
      this.Quantidade = 0
      for(let i in this.valores){
        if(this.valores[i].caixa === 'Entrada'){
          this.entradas = this.entradas + this.valores[i].valor * this.valores[i].Quantidade
          this.total = this.entradas - this.saidas
        }
        else{
          this.saidas = this.saidas + this.valores[i].valor * this.valores[i].Quantidade
          this.total = this.entradas - this.saidas
        }
      }
  
      this.chartOptions.series = [this.entradas, this.saidas, this.total]
    }
    
  }
}
