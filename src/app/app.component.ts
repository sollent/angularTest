import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {UsersService} from './shared/services/users.service';

@Component({
  selector: 'sollento-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sollentoAdminService';

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      if (this.userService.getUserByEmail(localStorage.getItem('user')['email'])) {
        this.authService.login();
      }
    }
  }

}
