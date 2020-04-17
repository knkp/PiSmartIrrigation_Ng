import { Component, Input, ViewChild,  } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts'
import { SensorData } from '../models/sensor-data';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;
  _dataSources: Observable<SensorData>[];
  @Input()
  set dataSources(src: Observable<SensorData>[]) {
    if (this.mappedLineChartData.length != src.length) {
      this.mappedLineChartData = src.map(() => ({ data: [], label: '' }));
    }
    this._dataSources = src;
    this._dataSources.forEach((sd, di) => {

      sd.subscribe(ds => {

        this.lineChartLabels = ds.xLabels;

        for (let i = 0; i < ds.data.length; i++) {
          if (this.mappedLineChartData[di].data.length <= i) {
            this.mappedLineChartData[di].data.push(ds.data[i]);
          }
          else {
            this.mappedLineChartData[di].data[i] = ds.data[i];
          }
        }
        this.mappedLineChartData[di].label = ds.label;
      });
    });
    // this._dataSource.subscribe(ds => {
    //   if (this.mappedLineChartData.length <= 0) {
    //     this.mappedLineChartData.push({
    //       data: [],
    //       label: ''
    //     });
    //   }
    //   for (let i = 0; i < ds.data.length; i++) {
    //     if (this.mappedLineChartData[0].data.length <= i) {
    //       this.mappedLineChartData[0].data.push(ds.data[i]);
    //     }
    //     else {
    //       this.mappedLineChartData[0].data[i] = ds.data[i];
    //     }
    //   }
    //   this.mappedLineChartData[0].label = ds.label;

    //   if (this.chart) {
    //     this.chart.update();
    //   }
    // });
  }
  constructor() {
    timer(1000, 1000).subscribe(() => {
      if (this.chart) {
        this.chart.update();
      }
    });
  }

  mappedLineChartData: ChartDataSets[] = [
  ];

  lineChartLabels: Label[] = [
    '12:00 AM',
    '1:00 AM',
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM',
    '6:00 AM',
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM'
  ];

  lineChartOptions: ChartOptions = {};


















  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
    {
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
    },
    {
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
    {
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
    },
    {
      borderColor: 'rgba(255, 159, 64, 1)',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
    }
  ];

  lineChartLegend = true;
  lineChartType = 'line';
}
