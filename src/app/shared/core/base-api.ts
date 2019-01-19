import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class BaseApi {

  // private baseUrl = 'http://91.240.85.73:3000';
  private baseUrl = 'http://localhost:3000';

  constructor(
    public http: HttpClient
  ) {}

  private getBaseUrl(url: string) {
    return this.baseUrl + url;
  }

  protected get(url: string): Observable<any> {
    return this.http.get(this.getBaseUrl(url));
  }

  protected post(url: string, data: any): Observable<any> {
   return this.http.post(this.getBaseUrl(url), data);
  }

  protected put(url: string, data: any): Observable<any> {
    return this.http.put(this.getBaseUrl(url), data);
  }

  protected delete(url: string): Observable<any> {
    return this.http.delete(this.getBaseUrl(url));
  }

}
