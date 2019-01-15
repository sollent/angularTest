import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../../shared/models/message.model';
import {Category} from '../../shared/models/category.model';
import {CategoryService} from '../../shared/services/category.service';

@Component({
  selector: 'sollento-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];

  form: FormGroup;
  message: Message;

  currentCategoryId = 1;
  currentCategory: Category;

  constructor(
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.prepareCurrentCategoryId();
    this.onSelectCategoryChange();
    this.message = new Message('warning', '');
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'capacity': new FormControl(10, [Validators.required, Validators.min(2)])
    });
  }

  onFormSubmit() {
    const {name, capacity} = this.form.value;
    const updatedCategory = new Category(name, capacity, this.currentCategoryId);
    this.categoryService.updateCategory(updatedCategory)
      .subscribe((category: Category) => {
        if (category) {
          this.showMessage('success', 'Категория успешно изменена');
        }
      });
  }

  onSelectCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }

  prepareCurrentCategoryId() {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i]) {
        this.currentCategoryId = this.categories[i].id;
      }
    }
  }

  showMessage(type: string, text: string, timeout: number = 5000) {
    this.message = new Message(type, text);
    setTimeout(() => {
      this.message.text = '';
    }, timeout);
  }

}
