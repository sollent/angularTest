import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../shared/services/category.service';
import {Category} from '../shared/models/category.model';
import {Subscription} from 'rxjs';
import {Message} from '../../shared/models/message.model';

@Component({
  selector: 'sollento-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  categories: Category[] = [];
  message: Message;

  sub1: Subscription;
  deleteCategoryModalIsOpen = false;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.message = new Message('warning', '');
   this.sub1 = this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  onCategoryAdd(category: Category) {
    this.categories.push({
      name: category.name,
      capacity: category.capacity,
      id: (+this.categories[this.categories.length - 1].id + 1)
    });
  }

  changeDeleteCategoryModalVisibility(condition: boolean) {
    this.deleteCategoryModalIsOpen = condition;
  }

  openDeleteCategoryModal() {
    this.changeDeleteCategoryModalVisibility(true);
  }

  onDeleteCategoryModalClose() {
    this.changeDeleteCategoryModalVisibility(false);
  }

  onDeleteCategoryModalApply(event: number) {
    this.categoryService.deleteCategory(event)
      .subscribe((category: Category) => {
        if (category) {
          this.showMessage('success', 'Категория успешно удалена');
          this.deleteCategoryFromArray(event);
          this.changeDeleteCategoryModalVisibility(false);
        }
      });
  }

  showMessage(type: string, text: string, timeout: number = 5000) {
    this.message = new Message(type, text);
    setTimeout(() => {
      this.message.text = '';
    }, timeout);
  }

  private deleteCategoryFromArray(categoryId: number) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === +categoryId) {
        this.categories.splice(i, 1);
      }
    }
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
