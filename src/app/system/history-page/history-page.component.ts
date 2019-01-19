import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../shared/services/category.service';
import {Category} from '../shared/models/category.model';
import {EventService} from '../shared/services/event.service';
import {combineLatest, Subscription} from 'rxjs';
import {SollentoEvent} from '../shared/models/event.model';

@Component({
  selector: 'sollento-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  sub1: Subscription;

  categories: Category[];
  chartData = [];
  events: SollentoEvent[] = [];

  constructor(
    private categoryService: CategoryService,
    private eventService: EventService
  ) {
  }

  ngOnInit() {
   this.sub1 = combineLatest(
      this.categoryService.getCategories(),
      this.eventService.getEvents()
    )
     .subscribe((data) => {
       this.categories = data[0];
      this.formChartData(data[0]);
      this.events = data[1];
      this.isLoaded = true;
    });
  }

  formChartData(categories: Category[]) {
    for (let i = 0; i < categories.length; i++) {
      this.chartData.push({
        name: categories[i]['name'],
        value: categories[i]['capacity']
      });
    }
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
