import { Component } from '@angular/core';

/**
 * Generated class for the LoadDataComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'load-data',
  templateUrl: 'load-data.html'
})
export class LoadDataComponent {

  text: string;

  constructor() {
    console.log('Hello LoadDataComponent Component');
    this.text = 'Hello World';
  }

}
