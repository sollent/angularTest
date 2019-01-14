import {HttpClient} from '@angular/common/http';

export class BaseApi {

  private baseUrl = 'http://91.240.85.73:3000';

  constructor(
    public http: HttpClient
  ) {}

  private getBaseUrl(url: string) {
    return this.baseUrl + url;
  }

  protected get(url: string) {
    return this.http.get(this.getBaseUrl(url));
  }

  protected post(url: string, data: any) {
   return this.http.post(this.getBaseUrl(url), data);
  }

}
