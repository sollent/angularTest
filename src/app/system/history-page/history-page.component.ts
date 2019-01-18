import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../shared/services/category.service';
import {Category} from '../shared/models/category.model';

@Component({
  selector: 'sollento-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  isLoaded = false;

  categories = [];

  constructor(
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        console.log(categories);
        for (let i = 0; i < categories.length; i++) {
          this.categories.push({
            name: categories[i]['name'],
            value: categories[i]['capacity']
          });
        }
        this.isLoaded = true;
      });
  }

}
