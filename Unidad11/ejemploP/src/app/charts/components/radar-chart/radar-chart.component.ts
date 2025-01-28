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
  public radarChartLabels = ['Puntualidad', 'Comunicación', 'Resolutivo', 'Lider', 'Simpatico', 'Conocimientos', 'Amable', 'feliz'];
  public radarChartData: ChartDataset[] = [
    { data: [0, 3, 4, 5, 6, 7, 9, 3], label: 'Análisis de habilidades' }
  ];
  public radarChartType: ChartType = 'radar'
}
