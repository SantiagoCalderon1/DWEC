import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-line-chart',
  standalone: false,

  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent {
  public lineChartData: ChartDataset[] = [
    {
      data: [61, 59, 80, 65, 45, 55, 40, 56, 76, 65, 77, 60],
      label: 'Apple',
    },
    {
      data: [57, 50, 75, 87, 43, 46, 37, 48, 67, 56, 70, 50],
      label: 'Microsoft',
    },
  ];
  public lineChartLabels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
}
