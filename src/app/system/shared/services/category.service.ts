import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category.model';

@Injectable()
export class CategoryService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getCategories(): Observable<any> {
    return this.get('/categories');
  }

  createCategory(category: Category): Observable<any> {
    return this.post('/categories', category);
  }

  updateCategory(category: Category): Observable<any> {
    return this.put(`/categories/${+category.id}`, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.delete(`/categories/${categoryId}`);
  }

}

