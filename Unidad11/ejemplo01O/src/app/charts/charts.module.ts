import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { BubbleChartComponent } from './components/bubble-chart/bubble-chart.component';

@NgModule({
  declarations: [
    BarChartComponent,
    LineChartComponent,
    DonutChartComponent,
    PieChartComponent,
    RadarChartComponent,
    BubbleChartComponent
  ],
  imports: [
    CommonModule,
    BaseChartDirective,
  ],
  providers: [
      provideCharts(withDefaultRegisterables())
    ],
})
export class ChartsModule { }
