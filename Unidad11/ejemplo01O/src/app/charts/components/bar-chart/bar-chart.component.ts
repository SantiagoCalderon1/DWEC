import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: false,
  
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  public barChartOptions: ChartOptions = {
    responsive: true,
    };
    public barChartLabels = ['2016', '2017', '2018', '2019', '2020', '2021'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartData: ChartDataset[] = [
      { data: [65, 67, 70, 75, 80, 90], label: 'Manzanas' },
      { data: [50, 48, 47, 49, 44, 40], label: 'Naranjas' },
      { data: [40, 30, 28, 25, 22, 20], label: 'Melocotones' },
      ];
}
