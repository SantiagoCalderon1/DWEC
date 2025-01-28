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
  public radarChartLabels = ['Puntualidad', 'Comunicación', 'Resolutivo', 'Lider', 'Simpatico', 'Conocimientos', 'Amable'];
  public radarChartData: ChartDataset[] = [
    { data: [0, 1, 2, 3, 4, 5, 6], label: 'Análisis de habilidades de Empleados' }
  ];
  public radarChartType: ChartType = 'radar'
}
