import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progresoAzul: number = 20;
  progresoVerde: number = 30;

  constructor() { }

  ngOnInit() {
  }

}
