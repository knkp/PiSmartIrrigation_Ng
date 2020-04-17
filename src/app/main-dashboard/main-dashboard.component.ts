import { Component, OnInit } from '@angular/core';
import { flatMap, map, merge, debounceTime, debounce, tap, throttleTime } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SensorsService } from '../services/sensors/sensors.service';
import { SensorDescription } from '../models/sensor-description';
import { SensorData } from '../models/sensor-data';
import { forkJoin, Observable, of, timer, interval, combineLatest } from 'rxjs';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

	 displayHumidity = true;
	 displaySunlight = true;

   /** Based on the screen size, switch from standard to one column per row */
   cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
     map(({ matches }) => {
       if (matches) {
         return [
           { type: 1, title: 'Phone Humidity 1', cols: 1, rows: 1 },
           { type: 1, title: 'Phone Humidity 2', cols: 1, rows: 1 },
           { type: 1, title: 'Phone Humidity 3', cols: 1, rows: 1 },
           { type: 1, title: 'Phone Humidity 4', cols: 1, rows: 1 },
           { type: 2, title: 'Sunlight Sensor', cols: 1, rows: 1 }
         ];
       }
 
       return [
           { type: 1, title: 'Desktop Humidity 1', cols: 1, rows: 1 },
           { type: 1, title: 'Desktop Humidity 2', cols: 1, rows: 1 },
           { type: 1, title: 'Desktop Humidity 3', cols: 1, rows: 1 },
           { type: 1, title: 'Desktop Humidity 4', cols: 1, rows: 1 },
           { type: 2, title: 'Sunlight Sensor', cols: 1, rows: 1 }
       ];
     })
   );
  sensors: SensorDescription[];
  sensorData: { id: number; source: Observable<SensorData>; }[];
  getSensorData(sensorId: number): Observable<SensorData> {
    const r =  this.sensorData.find(d => d.id == sensorId);
    return r.source;
  }

  retrieveSensorList(): Observable<SensorDescription[]>  {
    return this.sensorsService.getList();
  }
  retrieveSensorData(sensorId: number): Observable<SensorData>  {
    return this.sensorsService.getSensorData(sensorId).pipe(map(sd => {
      sd.data = sd.data.map(v => v + Math.random() * v / 5.0);
      return sd;
    }));
  }

  constructor(private breakpointObserver: BreakpointObserver, private sensorsService: SensorsService) {}


  async ngOnInit() {
    this.sensors = await this.retrieveSensorList().toPromise();
    
    this.sensorData = this.sensors.map(s => ({ id: s.id, source: timer(0, 1000).pipe(map(_ => this.retrieveSensorData(s.id)), flatMap(v => v)) }));
    
  }
}
