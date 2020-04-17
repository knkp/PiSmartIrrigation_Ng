import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorDescription } from 'src/app/models/sensor-description';
import { environment } from 'src/environments/environment';
import { SensorData } from 'src/app/models/sensor-data';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  baseApiUrl: string;

  

  getList(): Observable<SensorDescription[]> {
    return this.httpClient.get<SensorDescription[]>(this.baseApiUrl + 'sensors/list').pipe(tap(sd => sd.forEach(s => s.show = true)));
  }
  getSensorData(sensorId: number): Observable<SensorData> {
    return this.httpClient.get<SensorData>(this.baseApiUrl + 'sensors/' + sensorId);
  }

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = environment.baseApiUrl;
   }
}
