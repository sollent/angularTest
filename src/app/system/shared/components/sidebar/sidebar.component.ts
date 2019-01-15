import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'sollento-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() sidebarIsOpen: boolean;
  @Output() onSidebarClose = new EventEmitter();

  constructor() {
  }

  closeSidebar() {
    this.onSidebarClose.emit();
  }

  ngOnInit() {
  }

}
