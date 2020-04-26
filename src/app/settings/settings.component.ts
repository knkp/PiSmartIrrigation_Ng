import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { this.SelectedPin = 0; this.CurrentLabel="temp"; }

  SelectedPin: Number;
  CurrentLabel: String;

  // labels
  LabelA0: String;
  LabelA1: String;
  LabelA2: String;
  LabelA3: String;

  isHovered(pin: Number){
    this.SelectedPin = pin;
    if (pin == 0){
      this.CurrentLabel = this.LabelA0;
    } else if (pin == 1){
      this.CurrentLabel = this.LabelA1;
    } else if (pin == 2){
      this.CurrentLabel = this.LabelA2;
    } else if (pin == 3){
      this.CurrentLabel = this.LabelA3;
    }
  }

  ngOnInit(): void {
  }

}
