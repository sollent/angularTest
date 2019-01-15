import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'sollento-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {

  @Output() onModalClose = new EventEmitter();
  @Output() onModalApply = new EventEmitter();

  @Input() categories: Category[] = [];

  deleteCategoryId = 1;

  constructor() { }

  closeModal() {
    this.onModalClose.emit();
  }

  applyModal() {
    this.onModalApply.emit(this.deleteCategoryId);
  }

  ngOnInit() {
  }

}
