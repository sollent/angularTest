import {Component, Input, OnInit} from '@angular/core';
import {SollentoEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'sollento-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[];
  @Input() events: SollentoEvent[];

  types = {
    'income': 'Доход',
    'outcome': 'Расход'
  };

  inputValue = '';

  currentFieldPlaceholder = 'Поиск...';
  currentSearchField = 'amount';

  constructor() {
  }

  getClasses(type: string) {
    return {
      'label': true,
      'label-danger': type === 'outcome',
      'label-success': type === 'income'
    };
  }

  onChangeFilterField(criteria: string) {
    const name = {
      amount: 'Сумма',
      date: 'Дата',
      type: 'Тип',
      categoryName: 'Категория'
    };
    this.currentFieldPlaceholder = name[criteria];
    this.currentSearchField = criteria;
  }

  show() {
    console.log(this.currentSearchField);
    console.log(this.inputValue);
  }

  ngOnInit() {
    this.events.forEach((e) => {
      e.categoryName = this.categories.find(c => c.id === +e.category).name;
    });
  }

}
