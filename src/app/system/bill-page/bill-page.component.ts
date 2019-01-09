import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {combineLatest, Subscription} from 'rxjs';
import {Bill} from '../shared/models/bill.model';

@Component({
  selector: 'sollento-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscribe1: Subscription;
  subscribe2: Subscription;

  isLoaded: boolean;

  bill: Bill;
  currency: any;

  constructor(
    public billService: BillService
  ) {}

  ngOnInit() {
    this.subscribe1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe(
      (data) => {
        this.isLoaded = true;
        this.bill = <Bill>data[0];
        this.currency = data[1];
      }
    );
  }

  onRefresh() {
    this.isLoaded = false;
    this.subscribe2 = this.billService.getCurrency()
      .subscribe(
        (currency) => {
          this.isLoaded = true;
          this.currency = currency;
        }
      );
  }

  ngOnDestroy(): void {
    // this.subscribe1.unsubscribe();
    // this.subscribe2.unsubscribe();
  }

}
