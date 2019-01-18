import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sollento-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  @Input('categories') data;
  activeLink = 'pieChart';

  pieChartView = [600, 390];
  verticalCHartView = [700, 400];
  verticalCHartXAxis = true;
  legends = true;

  constructor() {
    if (window.screen.width < 630) {
      this.pieChartView = [400, 260];
      this.verticalCHartView = [400, 228];
      this.verticalCHartXAxis = false;
    }
    if (window.screen.width < 520) {
      this.legends = false;
    }
  }

  changeActiveLink(name: string) {
    this.activeLink = name;
  }

  pushNewElement() {
    this.data.push({
      name: 'Аккордеон',
      value: 17000
    });
  }

  ngOnInit() {
  }

}
