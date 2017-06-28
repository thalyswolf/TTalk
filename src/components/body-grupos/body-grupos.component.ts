import { Component } from '@angular/core';

/**
 * Generated class for the BodyGrupos component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'body-grupos',
  templateUrl: 'body-grupos.component.html'
})
export class BodyGrupos {

  text: string;

  constructor() {
    console.log('Hello BodyGrupos Component');
    this.text = 'Hello World';
  }

}
