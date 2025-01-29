import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-radar-chart',
  standalone: false,

  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css'
})
export class RadarChartComponent {
  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels = ['Puntualidad', 'Amabilidad', 'Alegre', 'Conocimientos', 'chistoso'];
  public radarChartData: ChartDataset[] = [
    { data: [1, 10, 8, 7, 10], label: 'Ventajas de ser colombiano' }
  ];
  public radarChartType: ChartType = 'radar'
}
