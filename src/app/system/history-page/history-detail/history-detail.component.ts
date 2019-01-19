import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EventService} from '../../shared/services/event.service';
import {mergeMap} from 'rxjs/operators';
import {SollentoEvent} from '../../shared/models/event.model';
import {Subscription} from 'rxjs';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'sollento-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  isLoaded = false;

  sub1: Subscription;
  sub2: Subscription;

  event: SollentoEvent;
  categories: Category[];

  types = {
    'income': 'Доход',
    'outcome': 'Расход'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.sub1 = this.route.params
      .pipe(
        mergeMap((params: Params) => this.eventService.getEventById(params['id']))
      )
      .subscribe((event: SollentoEvent) => {
        if (event) {
          this.event = event;
          this.sub2 = this.categoryService.getCategoryById(this.event.category)
            .subscribe((category: Category) => {
              this.event.categoryName = category.name;
              console.log(this.event);
              this.isLoaded = true;
            });
        }
      });
  }

  getClasses() {
    return {
      'card': true,
      'card-danger': this.event.type === 'outcome',
      'card-success': this.event.type === 'income'
    };
  }

  goBack() {
    this.router.navigate(['/system/history']);
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
