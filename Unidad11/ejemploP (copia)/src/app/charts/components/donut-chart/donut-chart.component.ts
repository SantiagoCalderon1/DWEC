import { Component } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-donut-chart',
  standalone: false,

  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.css',
})
export class DonutChartComponent {
  doughnutChartLabels = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData = [
    {
      data: [55, 25, 20],
    },
  ];
  doughnutChartType: ChartType = 'doughnut';
}
