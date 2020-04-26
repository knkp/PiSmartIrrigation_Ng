import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { this.SelectedPin = 0; }

  SelectedPin: Number;

  isHovered(pin: Number){
    this.SelectedPin = pin;
  }

  ngOnInit(): void {
  }

}
