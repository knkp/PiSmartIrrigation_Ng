import { Component, OnInit } from '@angular/core';
import { SensorsService } from '../services/sensors/sensors.service';
import { SensorList } from '../models/sensor-list';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  sensorGroups: SensorList;
  areChanges: Boolean;
  displayLabelUpdating: Boolean;

  // pin labels
  LabelA0: String;
  LabelA1: String;
  LabelA2: String;
  LabelA3: String;

  LabelA0_orig: String;
  LabelA1_orig: String;
  LabelA2_orig: String;
  LabelA3_orig: String;

  A0HasChanged: Boolean;
  A1HasChanged: Boolean;
  A2HasChanged: Boolean;
  A3HasChanged: Boolean;


  retrieveSensorList(): Observable<SensorList>  {
    return this.sensorsService.getList();
  }

  checkChanges() {
    this.areChanges = this.A0HasChanged || this.A1HasChanged || this.A2HasChanged || this.A3HasChanged;
  }

  //TODO: clean this mess, I'm sure there are better ways to do it in angular, I just don't know them yet
  A0labelUpdated(newLabel: string){
    this.LabelA0 = newLabel;
    if (this.LabelA0_orig == this.LabelA0){
      this.A0HasChanged = false;
    } else {
      this.A0HasChanged = true;
    }
    this.checkChanges();
  }

  A1labelUpdated(newLabel: string){
    this.LabelA1 = newLabel;
    if (this.LabelA1_orig == this.LabelA1){
      this.A1HasChanged = false;
    } else {
      this.A1HasChanged = true;
    }
    this.checkChanges();
  }

  A2labelUpdated(newLabel: string){
    this.LabelA2 = newLabel;
    if (this.LabelA2_orig == this.LabelA2){
      this.A2HasChanged = false;
    } else {
      this.A2HasChanged = true;
    }
    this.checkChanges();
  }

  A3labelUpdated(newLabel: string){
    this.LabelA3 = newLabel;
    if (this.LabelA3_orig == this.LabelA3){
      this.A3HasChanged = false;
    } else {
      this.A3HasChanged = true;
    }
    this.checkChanges();
  }

  constructor(private sensorsService: SensorsService, 
              private _snackbar: MatSnackBar) { 
                this.areChanges=false;
                this.displayLabelUpdating=false;
              }

  

  updateLabels(){
    console.log(this.LabelA0);
    console.log(this.LabelA1);
    console.log(this.LabelA2);
    console.log(this.LabelA3);
    this.displayLabelUpdating = true;
    this._snackbar.open('labels updated!', 'none', {
      duration:2000
    });
  };

  async currentValues(){
    this.sensorGroups = await this.retrieveSensorList().toPromise();
    for(const sensorGroup in this.sensorGroups){
      if (this.sensorGroups.hasOwnProperty(sensorGroup)) {
        if (sensorGroup == "Humidity"){
          const element = this.sensorGroups[sensorGroup];
          for (const iter in element.list){
            if ( element.list[iter].id == 1){
              this.LabelA0_orig = element.list[iter].name;
            } else if ( element.list[iter].id == 2){
              this.LabelA1_orig = element.list[iter].name;
            } else if ( element.list[iter].id == 3){
              this.LabelA2_orig = element.list[iter].name;
            } else if ( element.list[iter].id == 4){
              this.LabelA3_orig = element.list[iter].name;
            }
            
          }
        }
        
      }
    }

    this.LabelA0 = this.LabelA0_orig;
    this.LabelA1 = this.LabelA1_orig;
    this.LabelA2 = this.LabelA2_orig;
    this.LabelA3 = this.LabelA3_orig;
  }; 

  ngOnInit() {
    this.currentValues();
  }

}
