import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SollentoEvent} from '../../shared/models/event.model';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../shared/models/bill.model';
import {Message} from '../../../shared/models/message.model';
import {EventService} from '../../shared/services/event.service';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'sollento-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[];

  form: FormGroup;
  currentCategoryId = 2;
  types = [
    {
      type: 'income',
      label: 'Доход'
    },
    {
      type: 'outcome',
      label: 'Расход'
    }
  ];

  message: Message;

  constructor(
    private billService: BillService,
    private eventService: EventService
  ) {
  }

  ngOnInit() {
    this.message = new Message('warning', '');
    this.form = new FormGroup({
      'type': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required, Validators.min(10)]),
      'description': new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

  onFormLoad() {
    const {type, amount, description} = this.form.value;
    const event = new SollentoEvent(
      type, amount, this.currentCategoryId, new Date().toLocaleString(), description
    );
    console.log(event);

    this.billService.getBill()
      .subscribe((bill: Bill) => {
        let result = 0;
        if (type === 'outcome') {
          if (bill.value < amount) {
            this.showMessage('danger', `У вас недостаточно средств. Вам не хватает ${amount - bill.value}.`);
          } else {
            result = bill.value - amount;
          }
        } else {
          result = bill.value + amount;
        }

        this.eventService.addEvent(event)
          .pipe(
            mergeMap(() => this.billService.updateBill({
              value: result,
              currency: bill.currency
            }))
          ).subscribe((data) => {
            console.log(data);
        });

      });

  }

  showMessage(type: string, text: string, timeout: number = 5000) {
    this.message = new Message(type, text);
    setTimeout(() => {
      this.message.text = '';
    }, timeout);
  }

}
