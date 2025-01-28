import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: false,
  
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
  public pieChartOptions: ChartOptions = {
    responsive: true,};
    public pieChartLabels = ['Comedia', 'Terror', 'Fantasía'];
    public pieChartData : ChartDataset[] =[ {data:[60, 30, 60]} ];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];
}
