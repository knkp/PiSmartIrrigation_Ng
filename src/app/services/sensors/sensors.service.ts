import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorDescription } from 'src/app/models/sensor-description';
import { environment } from 'src/environments/environment';
import { SensorData } from 'src/app/models/sensor-data';
import { tap, map } from 'rxjs/operators';
import { SensorList } from 'src/app/models/sensor-list';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  baseApiUrl: string;

  getList(): Observable<SensorList> {
    return this.httpClient.get<SensorList>(this.baseApiUrl + 'sensors/list').pipe(tap(
      l => {
        for (const key in l) {
          if (l.hasOwnProperty(key)) {
            const element = l[key];
            element.show = true;
            element.list.forEach(s => {
              // s.show = element.list.length <= 1;
            });
          }
        }
        return l;
      }
    ));
  }
  getSensorData(sensorId: number): Observable<SensorData> {
    return this.httpClient.get<SensorData>(this.baseApiUrl + 'sensors/' + sensorId);
  }

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = environment.baseApiUrl;
   }
}
