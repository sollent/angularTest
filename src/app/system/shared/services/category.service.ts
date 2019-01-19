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

  getCategories(): Observable<Category[]> {
    return this.get('/categories');
  }

  getCategoryById(id: number): Observable<Category> {
    return this.get(`/categories/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.post('/categories', category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`/categories/${+category.id}`, category);
  }

  deleteCategory(categoryId: number): Observable<Category> {
    return this.delete(`/categories/${categoryId}`);
  }

}

