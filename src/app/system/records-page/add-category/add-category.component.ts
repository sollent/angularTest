import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category.model';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'sollento-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Output() onCategoryAdd = new EventEmitter();

  form: FormGroup;
  message: Message;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.message = new Message('warning', '');
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'capacity': new FormControl(10, [Validators.required, Validators.min(2)])
    });
  }

  onFormSubmit() {
    const { value } = this.form;
    this.categoryService.createCategory(value)
      .subscribe((category: Category) => {
        if (category) {
          this.showMessage('success', 'Категория успешно добавлена.');
        }
        this.onCategoryAdd.emit(value);
        this.form.reset();
      });
  }

  showMessage(type: string, text: string, timeout: number = 5000) {
    this.message = new Message(type, text);
    setTimeout(() => {
      this.message.text = '';
    }, timeout);
  }

}
