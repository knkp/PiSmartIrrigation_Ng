import { Component, Input, ViewChild,  } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts'
import { SensorData } from '../models/sensor-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;
  _dataSource: Observable<SensorData>;
  @Input()
  set dataSource(src: Observable<SensorData>) {
    this._dataSource = src;
    this._dataSource.subscribe(ds => {
      for (let i = 0; i < ds.data.length; i++) {
        if (this.mappedLineChartData[0].data.length <= i) {
          this.mappedLineChartData[0].data.push(ds.data[i]);
        }
        else {
          this.mappedLineChartData[0].data[i] = ds.data[i];
        }
      }
      this.mappedLineChartData[0].label = ds.label;
      
      if (this.chart) {
        this.chart.update();
      }
    });
  }
  constructor() {
  }

  mappedLineChartData: ChartDataSets[] = [
    {
      data: [],
      label: ''
    }
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'June', 'July'];

  lineChartOptions = {
    responsive:true,
    animation: {
      duration:1000
    }
  };

  lineChartColors: Color[] = [
    { 
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
}
