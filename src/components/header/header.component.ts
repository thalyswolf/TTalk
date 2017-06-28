import { Component, Input } from '@angular/core';


@Component({
  selector: 'header',
  templateUrl: 'header.component.html'
})
export class Header {

  @Input() title: string;
  @Input() photo: string;
  constructor() {

  }

}
