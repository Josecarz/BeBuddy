import { Component } from '@angular/core';

/**
 * Generated class for the CreateTourComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'create-tour',
  templateUrl: 'create-tour.html'
})
export class CreateTourComponent {

  text: string;

  constructor() {
    console.log('Hello CreateTourComponent Component');
    this.text = 'Hello World';
  }

}
