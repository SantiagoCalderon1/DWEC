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
      label: 'BomBom',
      backgroundColor: 'rgba(225,10,24,0.2)',
    },
    {
      data: [{ x: 30, y: 50, r: 30 }, { x: 50, y: 25, r: 50 }, { x: 20, y: 22, r: 20 }, { x: 40, y: 28, r: 40 },],
      label: 'Bellota',
      backgroundColor: 'rgba(10,225,24,0.2)',
    },
    {
      data: [{ x: 40, y: 40, r: 15 }, { x: 15, y: 15, r: 5 }, { x: 50, y: 12, r: 62 }, { x: 90, y: 45, r: 11 },],
      label: 'Burbuja',
      backgroundColor: 'rgba(66, 135, 245,0.2)',
    },
  ];
}
