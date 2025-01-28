import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-bubble-chart',
  standalone: false,

  templateUrl: './bubble-chart.component.html',
  styleUrl: './bubble-chart.component.css'
})
export class BubbleChartComponent {
  public bubbleChartOptions: ChartOptions = {
    responsive: true,
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;
  public bubbleChartData: ChartDataset[] = [
    {
      data: [{ x: 15, y: 15, r: 15 }, { x: 25, y: 15, r: 25 }, { x: 36, y: 12, r: 33 }, { x: 10, y: 18, r: 18 },],
      label: 'Primera Opción',
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,1)',
    },
    {
      data: [{ x: 30, y: 30, r: 30 }, { x: 45, y: 25, r: 35 }, { x: 46, y: 22, r: 43 }, { x: 20, y: 28, r: 28 },],
      label: 'Segunda Opción',
      backgroundColor: 'rgba(10,225,24,0.2)',
      borderColor: 'rgba(10,225,24,1)',
    },
  ];
}
