import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string) {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map((user: User[]) => user[0] ? user[0] : undefined)
      );
  }

  createNewUser(user: User) {
    return this.http.post('http://localhost:3000/users', user);
  }

}
