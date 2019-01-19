import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SollentoEvent} from '../models/event.model';

@Injectable()
export class EventService extends BaseApi {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  getEvents(): Observable<SollentoEvent[]> {
    return this.get('/events');
  }

  getEventById(id: string): Observable<SollentoEvent> {
    return this.get(`/events/${id}`);
  }

  addEvent(event: SollentoEvent): Observable<SollentoEvent> {
    return this.post('/events', event);
  }

}
