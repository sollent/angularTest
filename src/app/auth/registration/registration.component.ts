import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'sollento-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'agree': new FormControl(null, [Validators.requiredTrue])
    });
  }

  loadForm() {
    const form = this.form.value;
    this.userService.createNewUser(form)
      .subscribe(
        (user: User) => {
          console.log(user);
          this.router.navigate(['/login'], {
            queryParams: {
              nowCanLogin: true
            }
          });
        }
      );
  }

  forbiddenEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe(
          (user: User) => {
            if (user) {
              resolve({ forbiddenEmail: true });
            } else {
              resolve(null);
            }
          }
        );
    });
  }

}
