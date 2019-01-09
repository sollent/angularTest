import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'sollento-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams
      .subscribe(
        (params: Params) => {
          if (params['nowCanLogin']) {
            this.showMessage('Вы успешно зарегестрированны. Можете войти в систему.', 'success', 10000);
          } else if (params['accessDenied']) {
            this.showMessage('Для работы с системой сначала войдите.', 'warning', 10000);
          }
        }
      );
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(text: string, type: string = 'danger', timeout: number = 5000) {
    this.message = new Message(type, text);
    if (timeout) {
      window.setTimeout(() => {
        this.message.text = '';
      }, timeout);
    }
  }

  loadForm() {
    const form = this.form.value;
    this.userService.getUserByEmail(form.email)
      .subscribe(
        (user: User) => {
          if (user) {
            if (user.password === form.password) {
              localStorage.setItem('user', JSON.stringify(user));
              this.authService.login();
              this.router.navigate(['/system']);
            } else {
              this.showMessage('Пароль неверный');
            }
          } else {
            this.showMessage('Такого юзера не существует!');
          }
        }
      );
  }

  forbiddenEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe(
          (user: User) => {
            if (user) {
              resolve(null);
            } else {
              resolve({ forbiddenEmail: true });
            }
          }
        );
    });
  }

}
