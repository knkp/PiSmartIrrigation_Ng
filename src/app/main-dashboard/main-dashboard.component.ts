import { Component, OnInit } from '@angular/core';
import { flatMap, map, merge, debounceTime, debounce, tap, throttleTime } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SensorsService } from '../services/sensors/sensors.service';
import { SensorDescription } from '../models/sensor-description';
import { SensorData } from '../models/sensor-data';
import { forkJoin, Observable, of, timer, interval, combineLatest } from 'rxjs';
import { SensorList } from '../models/sensor-list';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

	 displayHumidity = true;
	 displaySunlight = true;
   objectKeys = Object.keys;
   /** Based on the screen size, switch from standard to one column per row */

  sensorGroups: SensorList;
  sensorData: { id: number; source: Observable<SensorData>[]; }[];
  sensorGroupData: { [group: string]: Observable<SensorData>[] } = {};
  getSensorData(sensorId: number): Observable<SensorData>[] {
    const r =  this.sensorData.find(d => d.id == sensorId);
    return r.source;
  }
  getSensorGroupData(groupName: string): Observable<SensorData>[] {
    return this.sensorGroupData[groupName];
  }

  retrieveSensorList(): Observable<SensorList>  {
    return this.sensorsService.getList();
  }
  retrieveSensorData(sensorId: number): Observable<SensorData>  {
    return this.sensorsService.getSensorData(sensorId);
  }

  constructor(private breakpointObserver: BreakpointObserver, private sensorsService: SensorsService) {}


  async ngOnInit() {
    this.sensorGroups = await this.retrieveSensorList().toPromise();
    this.sensorData = [];
    for (const sensorGroup in this.sensorGroups) {
      if (this.sensorGroups.hasOwnProperty(sensorGroup)) {
        const element = this.sensorGroups[sensorGroup];
        // const groupO = element.map(s => (timer(0, 1000).pipe(map(_ => this.retrieveSensorData(s.id).pipe(map(d => d))), flatMap(v => v))));
        const groupO = element.list.map(s => ({ id: s.id, source: [timer(0, 1000).pipe(map(_ => this.retrieveSensorData(s.id).pipe(map(d => d))), flatMap(v => v))] }));
        groupO.forEach(g => this.sensorData.push(g));
        this.sensorGroupData[sensorGroup] = groupO.map(g => g.source[0]);
      }
    }
    // this.sensorData = this.sensors.map(s => ({ id: s.id, source: [timer(0, 1000).pipe(map(_ => this.retrieveSensorData(s.id).pipe(map(d => d))), flatMap(v => v))] }));

  }
}
