import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sollento-system',
  templateUrl: './system.component.html'
})

export class SystemComponent implements OnInit {

  sidebarIsOpen = false;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.router.navigate(['/system/bill']);
  }

  openSidebar() {
    this.sidebarIsOpen = true;
  }

  closeSidebar() {
    this.sidebarIsOpen = false;
  }

}
