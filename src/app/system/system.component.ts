import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sollento-system',
  templateUrl: './system.component.html'
})

export class SystemComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.navigate(['/system/bill']);
  }

}
