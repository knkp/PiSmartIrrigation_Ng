import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorDescription } from 'src/app/models/sensor-description';
import { environment } from 'src/environments/environment';
import { SensorData } from 'src/app/models/sensor-data';
import { tap, map } from 'rxjs/operators';
import { SensorList } from 'src/app/models/sensor-list';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  httpOptions: any;
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

  postLabel(body: any): Observable<any> { 
    return this.httpClient.post(this.baseApiUrl + 'label', body, this.httpOptions)
       .pipe(
          catchError(this.handleError)
       );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = environment.baseApiUrl;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
   }
}
