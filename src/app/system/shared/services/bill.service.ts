import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../../../shared/core/base-api';
import {Bill} from '../models/bill.model';
import {Observable} from 'rxjs';

@Injectable()
export class BillService extends BaseApi {

  private API_KEY = '37dc00dd393f13b4a471c55e28a3c7d5';

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  getBill() {
    return this.get('/bill');
  }

  updateBill(bill: Bill): Observable<any> {
    return this.put('/bill', bill);
  }

  // Request to fixer.io api service
  getCurrency(currency: string = 'BYN') {
    return this.http.get(`http://data.fixer.io/latest?access_key=${this.API_KEY}`);
  }

}
