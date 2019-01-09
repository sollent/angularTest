import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[sollentoHeaderDropdown]'
})

export class HeaderDropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }

}
