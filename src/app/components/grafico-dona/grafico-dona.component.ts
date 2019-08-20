import {Component, Input, OnInit} from '@angular/core';
import {Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {

  @Input('chartLabels') public doughnutChartLabels: Label[] = [];
  @Input('chartData') public doughnutChartData: MultiDataSet = [];
  @Input('chartType') public doughnutChartType: ChartType;

  constructor() { }

  ngOnInit() {
    console.log(this.doughnutChartLabels);
    console.log(this.doughnutChartType);
  }

}
