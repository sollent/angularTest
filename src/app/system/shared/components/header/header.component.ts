import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../../shared/models/user.model';
import {Router} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'sollento-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  @Output() onSidebarOpen = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  changeSidebarState() {
    this.onSidebarOpen.emit();
  }

}
